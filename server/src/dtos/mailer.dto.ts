import {
  IsDefined,
  IsEmail,
  IsString,
} from "class-validator";

export class SendRecoveryPhraseDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  phrase: string;
}
