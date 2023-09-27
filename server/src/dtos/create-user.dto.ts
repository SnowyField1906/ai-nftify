import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly verified_email: boolean;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly given_name: string;

  @IsString()
  readonly family_name: string;

  @IsString()
  @IsNotEmpty()
  readonly picture: string;


  @IsString()
  @IsNotEmpty()
  readonly locale: string;

}
