import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";

export class UpdateOrdinalDto {
    @IsString()
    @IsNotEmpty()
    readonly nftId: string;

    @IsString()
    @IsNotEmpty()
    readonly owner: string;
}