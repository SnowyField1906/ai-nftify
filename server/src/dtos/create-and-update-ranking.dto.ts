import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";


export class CreateRankingsDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsNumber()
  @IsNotEmpty()
  readonly numSold: number;

  @IsNumber()
  @IsNotEmpty()
  readonly numPurchased: number;

  @IsNumber()
  @IsNotEmpty()
  readonly numPromptSold: number;

  @IsNumber()
  @IsNotEmpty()
  readonly numPromptPurchased: number;
}
