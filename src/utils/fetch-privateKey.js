import axios from 'axios';
import { decrypt, generatePrivate, getPublic } from '@toruslabs/eccrypto';
import { toChecksumAddress } from 'web3-utils';
import { kCombinations, keccak256, thresholdSame } from './index';
import BN from 'bn.js';
import { ec as EC } from 'elliptic';
export const ec = new EC('secp256k1');

const config = {
    nodeEndpoints: [
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003',
    ],
    nodePub: [
        {
            X: 'bc38813a6873e526087918507c78fc3a61624670ee851ecfb4f3bef55d027b5a',
            Y: 'ac4b21229f662a0aefdfdac21cf17c3261a392c74a8790db218b34e3e4c1d56a',
        },
        {
            X: 'b56541684ea5fa40c8337b7688d502f0e9e092098962ad344c34e94f06d293fb',
            Y: '759a998cef79d389082f9a75061a29190eec0cac99b8c25ddcf6b58569dad55c',
        },
        {
            X: '4b5f33d7dd84ea0b7a1eb9cdefe33dbcc6822933cfa419c0112e9cbe33e84b26',
            Y: '7a7813bf1cbc2ee2c6fba506fa5de2af1601a093d93716a78ecec0e3e49f3a57',
        },
    ],
    indexes: [1, 2, 3],
};

export const getAddress = async (
    input,
) => {
    let errorApi;
    for (const endpoint of config.nodeEndpoints) {
        try {
            const { email } = input;
            const { data } = await axios.post(
                `${endpoint}/wallets`,
                {
                    owner: email,
                },
            );
            return { data, error: null };
        } catch (error) {
            const errorMessage = error.response?.data.message;
            const statusCode = error.response?.data.statusCode;
            errorApi = { errorMessage, statusCode };
        }
    }
    if (!errorApi) return { data: null, error: errorApi };
};

function lagrangeInterpolation(shares, nodeIndex) {
    if (shares.length !== nodeIndex.length) {
        return null;
    }
    let secret = new BN(0);
    for (let i = 0; i < shares.length; i += 1) {
        let upper = new BN(1);
        let lower = new BN(1);
        for (let j = 0; j < shares.length; j += 1) {
            if (i !== j) {
                upper = upper.mul(nodeIndex[j].neg());
                upper = upper.umod(ec.curve.n);
                let temp = nodeIndex[i].sub(nodeIndex[j]);
                temp = temp.umod(ec.curve.n);
                lower = lower.mul(temp).umod(ec.curve.n);
            }
        }
        let delta = upper.mul(lower.invm(ec.curve.n)).umod(ec.curve.n);
        delta = delta.mul(shares[i]).umod(ec.curve.n);
        secret = secret.add(delta);
    }
    return secret.umod(ec.curve.n);
}

export function generateAddressFromPrivKey(privateKey) {
    const key = ec.keyFromPrivate(privateKey.toString('hex', 64), 'hex');
    const publicKey = key.getPublic().encode('hex', false).slice(2);
    const ethAddressLower = `0x${keccak256(Buffer.from(publicKey, 'hex')).slice(
        64 - 38,
    )}`;
    return toChecksumAddress(ethAddressLower);
}

export const getPrivateKey = async (input) => {
    try {
        const { idToken, owner, verifier } = input;
        await getAddress({ email: owner, verifier: verifier });

        const tmpKey = generatePrivate();
        const pubKey = getPublic(tmpKey).toString("hex");

        const tokenCommitment = keccak256(idToken);
        const { nodeEndpoints, indexes } = config;
        const signatures = [];

        for (let i = 0; i < nodeEndpoints.length; i += 1) {
            try {
                const p = await axios.post(
                    `${nodeEndpoints[i]}/commitments`,
                    {
                        commitment: tokenCommitment,
                        tempPub: pubKey,
                        timestamp: (Date.now() + 60).toString(),
                    },
                );
                signatures.push(p.data);
            } catch (error) { }
        }
        if (signatures.length <= ~~(nodeEndpoints.length / 4) * 3 + 1) {
            return {
                data: null,
                error: { statusCode: '400', errorMessage: 'Invalid signature' },
            };
        }
        const shares = [];
        for (let i = 0; i < nodeEndpoints.length; i += 1) {
            try {
                const p = await axios.post(
                    `${nodeEndpoints[i]}/shared-keys`,
                    {
                        nodeSignatures: signatures,
                        verifier,
                        owner,
                        idToken,

                        tempPub: pubKey,
                    });

                shares.push(p.data)
            } catch (error) { }
        }

        const completedRequests = shares.filter((x) => x);
        const thresholdPublicKey = thresholdSame(
            shares.map((x) => x && x.publicKey),
            ~~(nodeEndpoints.length / 2) + 1
        );

        if (completedRequests.length >= ~~(nodeEndpoints.length / 2) + 1) {
            const sharePromises = [];
            const nodeIndexes = [];
            for (let i = 0; i < shares.length; i += 1) {
                const currentShareResponse = shares[i];
                const key = currentShareResponse;
                if (key) {
                    if (key.metadata) {
                        const metadata = {
                            ephemPublicKey: Buffer.from(key.metadata.ephemPublicKey, "hex"),
                            iv: Buffer.from(key.metadata.iv, "hex"),
                            mac: Buffer.from(key.metadata.mac, "hex"),
                            // mode: Buffer.from(key.metadata.mode, "hex"),
                        };
                        const shareDecrypt = decrypt(tmpKey, {
                            ...metadata,
                            ciphertext: Buffer.from(key.share, "hex"),
                        });
                        sharePromises.push(shareDecrypt);
                    }
                } else {
                    sharePromises.push(Promise.resolve(Buffer.from(key.share.padStart(66, "0"), "hex")));
                }
                nodeIndexes.push(new BN(indexes[i], 16));
            }
            const sharesResolved = await Promise.all(sharePromises);

            const decryptedShares = sharesResolved.reduce((acc, curr, index) => {
                if (curr) acc.push({ index: nodeIndexes[index], value: new BN(curr.toString(), "hex") });
                return acc;
            }, []);

            const allCombis = kCombinations(decryptedShares.length, ~~(nodeEndpoints.length / 2) + 1);
            let privateKey = null;
            for (let j = 0; j < allCombis.length; j += 1) {
                const currentCombi = allCombis[j];
                const currentCombiShares = decryptedShares.filter((v, index) => currentCombi.includes(index));

                const shares = currentCombiShares.map((x) => x.value);
                const indices = currentCombiShares.map((x) => x.index);
                const derivedPrivateKey = lagrangeInterpolation(shares, indices);
                if (!derivedPrivateKey) continue;
                const decryptedPubKey = getPublic(Buffer.from(derivedPrivateKey.toString(16, 64), "hex")).toString("hex");
                if (thresholdPublicKey === decryptedPubKey) {
                    privateKey = derivedPrivateKey;
                }
            }
            if (privateKey === undefined || privateKey === null) {
                return {
                    data: null,
                    error: {
                        errorMessage: "could not derive private key",
                        statusCode: "400"
                    }
                }
            }
            const ethAddress = generateAddressFromPrivKey(privateKey);
            return {
                data: {
                    ethAddress,
                    privKey: privateKey.toString('hex', 64),
                },
                error: null,
            };
        }
    } catch (error) { }
};