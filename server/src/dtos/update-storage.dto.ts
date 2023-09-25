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
  readonly thumbnail: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly listing: boolean;

  @IsBoolean()
  @IsNotEmpty()
  readonly isRootStock: boolean;

  @IsBoolean()
  @IsNotEmpty()
  readonly privateMeta: boolean;


  @IsArray()
  @IsNotEmpty()
  readonly allowedUsers: Array<string>;

  // @IsString()
  // @IsNotEmpty()
  // readonly signature: string;

  // @IsObject()
  // @ValidateNested()
  // @IsNotEmptyObject()
  // @Type(() => EncryptedMetadataDto)
  // @IsNotEmpty()
  // readonly encryptedMetadata: EncryptedMetadataDto;
}
