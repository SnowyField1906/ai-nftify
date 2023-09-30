import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";

export class CreateOrdinalDto {
  @IsString()
  @IsNotEmpty()
  readonly nftId: string;

  @IsString()
  @IsNotEmpty()
  readonly owner: string;

  @IsNumber()
  readonly price: Number;

  @IsNumber()
  readonly promptPrice: Number;

  @IsArray()
  readonly promptBuyer: Array<string>;
}