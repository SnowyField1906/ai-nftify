const { ethers, JsonRpcProvider } = require("ethers");
const ABI = require("./ABI.json");
const { getInfoUser } = require("../storage/local");


const provider = new JsonRpcProvider("https://public-node.testnet.rsk.co");
const contractAddress = "0xff767fdFC738fC21C24bfc1c5F597dcf1EFC5fB6";

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

export const getMyPrompt = async () => {
    const contract = await getContract();
    const res = await contract.getMyPrompt();
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

export const buyPrompt = async (ids) => {
    const contract = await getContract();
    const res = await contract.buyPrompt(ids).then(tx => tx.wait());
    return res;
}

export const executeSale = async (id, price) => {
    const contract = await getContract();
    const priceWei = price * 1e18;
    const res = await contract.executeSale(id, { value: priceWei }).then(tx => tx.wait());
    return res;
}
