import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

class EncryptedMetadataDto {
  @IsNotEmpty()
  @IsString()
  mac: string;

  @IsNotEmpty()
  @IsString()
  ciphertext: string;

  @IsNotEmpty()
  @IsString()
  iv: string;

  @IsNotEmpty()
  @IsString()
  ephemPublicKey: string;
}
export class CreateStorageDto {
  @IsString()
  @IsNotEmpty()
  readonly owner: string;

  @IsString()
  @IsNotEmpty()
  readonly publicKey: string;

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
