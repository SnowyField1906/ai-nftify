import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

export class CreateStorageDto {

  @IsString()
  @IsNotEmpty()
  readonly nftId: string;

  @IsString()
  @IsNotEmpty()
  readonly nftName: string;

  @IsString()
  @IsNotEmpty()
  readonly thumbnail: string;
}
