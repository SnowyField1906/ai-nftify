const { ethers, JsonRpcProvider } = require("ethers");
const ABI = require("./ABI.json");
const { getInfoUser } = require("../storage/local");


const provider = new JsonRpcProvider("https://public-node.testnet.rsk.co");
const contractAddress = "0xbBcD1D021699044165451fba4e3974F81e8ea155";

const getContract = async () => {
    const privateKey = getInfoUser().key.data.privKey
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    return contract;
};

const parseCallResult = (res) => res.map(r => ({ ...r }))

export const getBalance = async (address) => {
    const res = await provider.getBalance(address);
    return ethers.formatEther(res);
}

export const getAllNFTs = async () => {
    const contract = await getContract();
    const res = await contract.getAllNFTs();
    return parseCallResult(res);
}

export const getMyNFTs = async () => {
    const contract = await getContract();
    const res = await contract.getMyNFTs();
    return parseCallResult(res);
}

export const getMyPrompt = async () => {
    const contract = await getContract();
    const res = await contract.getMyPrompt();
    return parseCallResult(res);
}

export const createToken = async (tokenURI, price, promptPrice) => {
    const contract = await getContract();
    const res = await contract.createToken(tokenURI, price, promptPrice);
    return res;
}