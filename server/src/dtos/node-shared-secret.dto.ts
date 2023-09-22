import { IsNotEmpty, IsString } from "class-validator";

export class NodeSharedSecretDto {
  readonly threshold: number;
  readonly share: string;
  readonly metadata: {
    iv: string;
    ephemPublicKey: string;
    mac: string;
  };
  readonly publicKey: string;
}
