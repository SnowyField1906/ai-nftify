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
  readonly nftId: string;

  @IsString()
  @IsNotEmpty()
  readonly newNftId: string;
}
