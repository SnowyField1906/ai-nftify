import { Big } from "bigdecimal.js";

const { ethers, JsonRpcProvider } = require("ethers");
const ABI = require("./ABI.json");
const { getInfoUser } = require("../storage/local");


const provider = new JsonRpcProvider("https://public-node.testnet.rsk.co");
const contractAddress = "0x97aE42Ebba12c0dE2e1bd0DB20D54F6b1C4E045D";

const getContract = async () => {
    const privateKey = getInfoUser().key.data.privKey
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    return contract;
};

const parseProxiesToArray = obj => Array.isArray(obj) ? obj.map(item => parseProxiesToArray(item)) : obj;


export const getBalance = async (address) => {
    const res = await provider.getBalance(address);
    return ethers.formatEther(res);
}

export const getAllNFTs = async () => {
    const contract = await getContract();
    const res = await contract.getAllNFTs();
    return parseProxiesToArray(res);
}

export const getMyNFTs = async () => {
    const contract = await getContract();
    const res = await contract.getMyNFTs();
    return parseProxiesToArray(res);
}

export const getNFTsFromAddress = async (address) => {
    const contract = await getContract();
    const res = await contract.getNFTsFromAddress(address);
    return parseProxiesToArray(res);
}

export const getMyPrompts = async () => {
    const contract = await getContract();
    const res = await contract.getMyPrompts();
    return parseProxiesToArray(res);
}

export const getCurrentToken = async () => {
    const contract = await getContract();
    const res = await contract.getCurrentToken();
    return parseProxiesToArray(res);
}

export const createToken = async (tokenURI, price, promptPrice) => {
    const contract = await getContract();
    const res = await contract.createToken(tokenURI, price, promptPrice).then(tx => tx.wait());
    return res;
}

export const updatePromptPrices = async (ids, newPromptPrice) => {
    const contract = await getContract();
    const res = await contract.updatePromptPrices(ids, newPromptPrice).then(tx => tx.wait());
    return res;
}

export const updateTokenPrices = async (ids, newPrice) => {
    const contract = await getContract();
    const res = await contract.updateTokenPrices(ids, newPrice).then(tx => tx.wait());
    return res;
}

export const transferNFTs = async (ids, to) => {
    const contract = await getContract();
    const res = await contract.transferNFTs(ids, to).then(tx => tx.wait());
    return res;
}

export const withdrawNFTs = async (ids, to) => {
    const contract = await getContract();
    const res = await contract.withdrawNFTs(ids, to).then(tx => tx.wait());
    return res;
}

export const buyPrompt = async (id, promptPrice) => {
    const contract = await getContract();
    const res = await contract.buyPrompt(id, { value: Big(promptPrice).multiply(1e18).toBigInt().toString() }).then(tx => tx.wait());
    return res;
}

export const executeSale = async (id, price) => {
    const contract = await getContract();
    const res = await contract.executeSale(id, { value: Big(price).multiply(1e18).toBigInt().toString() }).then(tx => tx.wait());
    return res;
}

export const bridgeNFT = async (thumbnail) => {
    const contract = await getContract();
    const res = await contract.bridgeNFT(thumbnail).then(tx => tx.wait());
    return res;
}

export const burnBridgedToken = async (id) => {
    const contract = await getContract();
    const res = await contract.burnBridgedToken(id).then(tx => tx.wait());
    return res;
}