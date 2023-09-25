import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

// class EncryptedMetadataDto {
//   @IsNotEmpty()
//   @IsString()
//   mac: string;

//   @IsNotEmpty()
//   @IsString()
//   ciphertext: string;

//   @IsNotEmpty()
//   @IsString()
//   iv: string;

//   @IsNotEmpty()
//   @IsString()
//   ephemPublicKey: string;
// }
export class CreateStorageDto {
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

}
