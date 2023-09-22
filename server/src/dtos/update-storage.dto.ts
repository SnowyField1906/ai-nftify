import { Type } from "class-transformer";
import {
  IsDefined,
  IsEmpty,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

class EncryptedMetadataDto {
  @IsString()
  @IsOptional()
  mac: string;

  @IsString()
  @IsOptional()
  ciphertext: string;

  @IsString()
  @IsOptional()
  iv: string;

  @IsString()
  @IsOptional()
  ephemPublicKey: string;
}

export class UpdateStorageDto {
  @IsString()
  @IsNotEmpty()
  readonly owner: string;

  @IsString()
  @IsNotEmpty()
  readonly signature: string;

  @IsObject()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => EncryptedMetadataDto)
  @IsNotEmpty()
  readonly encryptedMetadata: EncryptedMetadataDto;
}
