// import keccak from "keccak";
const keccak = require("keccak");

export function getAddress(publicKey: string): string {
  const formatedPublicKey = publicKey.slice(2);
  const publicKeyBytes = Buffer.from(formatedPublicKey, "hex");

  const hash = createKeccak256(publicKeyBytes);
  const address = hash.slice(-40);

  const hashAddress = createKeccak256(address).slice(2);

  let checksumAddress = "0x";

  for (let i = 0; i < address.length; i++) {
    if (parseInt(hashAddress[i], 16) >= 8) {
      checksumAddress += address[i].toUpperCase();
    } else {
      checksumAddress += address[i];
    }
  }

  return checksumAddress;
}

export function createKeccak256(data: string | Buffer): string {
  const hash = keccak("keccak256").update(data).digest("hex");
  return `0x${hash}`;
}
