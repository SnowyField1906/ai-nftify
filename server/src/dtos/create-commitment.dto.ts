import { IsNotEmpty, IsString } from "class-validator";
import { Date } from "mongoose";

export class CreateCommitmentDto {
  @IsString()
  @IsNotEmpty()
  readonly commitment: string;

  @IsString()
  @IsNotEmpty()
  readonly tempPub: string;

  readonly timestamp: Date;

  readonly verifier: string;
}
