import { IsString, IsInt, IsIn } from 'class-validator';

export class KeyAssignDto {
  @IsString()
  email: string;

  @IsIn(["google"])
  verifier: string;
}