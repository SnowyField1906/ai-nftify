import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";

class AddressTypeDto {
  @IsString()
  @IsNotEmpty()
  btc: string;

  @IsString()
  @IsNotEmpty()
  eth: string;
}

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressTypeDto)
  @IsNotEmpty()
  readonly address: AddressTypeDto;

  @IsString()
  @IsNotEmpty()
  readonly publicKey: string;
}
