import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";

export class CreateBridgeDto {
  @IsString()
  @IsNotEmpty()
  readonly nftId: string;

  @IsString()
  @IsNotEmpty()
  readonly ordId: string;
}