import * as elliptic from "elliptic";

export const secp256k1 = new elliptic.ec("secp256k1");
// generator order value of `secp256k1` curve
export const nSecp256k1 = secp256k1.curve.n;
