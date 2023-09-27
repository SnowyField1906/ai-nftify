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

export const getAllNFTs = async () => {
    const contract = await getContract();
    const res = await contract.getAllNFTs();
    return res;
}

export const getMyNFTs = async () => {
    const contract = await getContract();
    const res = await contract.getMyNFTs();
    return res;
}

export const getMyPrompt = async () => {
    const contract = await getContract();
    const res = await contract.getMyPrompt();
    return res;
}