const ethers = require("ethers");
const ABI = require("./ABI.json");

const callFunc = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://public-node.testnet.rsk.co"
  );

  const contract = "0xbBcD1D021699044165451fba4e3974F81e8ea155";

  const mkp = new ethers.Contract(contract, ABI, provider);
  
  let name = await mkp.getCurrentPromptPrice(1);
  console.log(name);
};

callFunc();
