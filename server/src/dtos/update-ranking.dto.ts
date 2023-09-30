import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";


export class UpdateRankingsDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsNumber()
  @IsNotEmpty()
  readonly numSold: Number;

  @IsNumber()
  @IsNotEmpty()
  readonly numPurchased: Number;

  @IsNumber()
  @IsNotEmpty()
  readonly numPromptSold: Number;

  @IsNumber()
  @IsNotEmpty()
  readonly numPromptPurchased: Number;

  @IsString()
  @IsNotEmpty()
  readonly idUserSold: string;
}
