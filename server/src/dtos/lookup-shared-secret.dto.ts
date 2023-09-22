import { IsNotEmpty, IsString } from "class-validator";
import { NodeCommitmentDto } from "./node-commitment.dto";

export class LookupSharedSecretDto {
  @IsNotEmpty()
  @IsString()
  readonly owner: string;

  @IsNotEmpty()
  @IsString()
  readonly idToken: string;

  @IsNotEmpty()
  @IsString()
  readonly tempPub: string;

  readonly nodeSignatures: NodeCommitmentDto[];
}
