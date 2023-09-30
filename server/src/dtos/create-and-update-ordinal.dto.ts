import { IsNotEmpty, IsString } from "class-validator";

export class OrdinalDto {
  @IsString()
  readonly nftId: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly ordId: string;

  @IsString()
  @IsNotEmpty()
  readonly thumbnail: string;
}
