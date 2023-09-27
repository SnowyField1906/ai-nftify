import { Type } from "class-transformer";
import {
  IsArray,
  IsDefined,
  IsEmpty,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  IsBoolean
} from "class-validator";


export class UpdateStorageDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly nftId: string;

  @IsString()
  @IsNotEmpty()
  readonly nftName: string;

  @IsString()
  @IsNotEmpty()
  readonly price: string;

  @IsString()
  @IsNotEmpty()
  readonly promptPrice: string;

  @IsString()
  @IsNotEmpty()
  readonly thumbnail: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isRootStock: boolean;

}
