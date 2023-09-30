import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  NotFoundException,
  Headers,
  BadRequestException,
  Delete,
} from "@nestjs/common";
import { CreateOrdinalDto } from "src/dtos/create-ordinal.dto";
import { UpdateOrdinalDto } from "src/dtos/update-ordinal.dto";
import { AddressService, OrdinalService } from "src/services";
import { Ordinal } from "src/schemas";
import { verifyAccessToken } from "src/verifier/oauth.verifier";

@Controller("ordinals")
export class OrdinalController {
  constructor(private readonly ordinalService: OrdinalService, private readonly addressService: AddressService) { }
  @Post()
  async createOrdinal(@Body() createOrdinal: CreateOrdinalDto): Promise<Ordinal> {
    const existedAddress = await this.ordinalService.findOrdinalByNftId(createOrdinal.nftId);
    if (existedAddress) {
      throw new BadRequestException("Address already exists");
    }
    return this.ordinalService.createOrdinal(createOrdinal);
  }
  @Get(":id")
  async getOrdinalById(@Param("id") id: string,): Promise<Array<Ordinal>> {
    const infoByNftId = await this.ordinalService.findOrdinalByNftId(id);
    if (!infoByNftId) {
      const infoByOwner = await this.ordinalService.findOrdinalByOwner(id);
      if (!infoByOwner) {
        throw new NotFoundException(`Can not find ordinal with ${id}`);
      }
      return infoByOwner;
    }
    return [infoByNftId];
  }

  @Get()
  async getAllOrdinal(): Promise<Array<Ordinal>> {
    const allOrdinal = await this.ordinalService.getAllOrdinal()
    if (!allOrdinal) {
      throw new NotFoundException(`Empty address`);
    }
    return allOrdinal;
  }
  @Put()
  async updateOrdinal(@Body() updateOrdinal: UpdateOrdinalDto, @Headers('Authorization') accessToken: string): Promise<any> {
    const { id } = await verifyAccessToken(accessToken);
    if (!id) {
      throw new BadRequestException("Your need login");
    }
    const addressOwner = (await this.addressService.findAddressById(id)).id;
    if (addressOwner !== id) {
      throw new BadRequestException("Owner not match");
    }


    const existedOrdinal = await this.ordinalService.findOrdinalByNftId(updateOrdinal.nftId);
    if (!existedOrdinal) {
      throw new BadRequestException("Ordinal does not exist");
    }
    return this.ordinalService.updateOrdinal(updateOrdinal.nftId, updateOrdinal.owner);
  }

  @Delete(":id")
  async deleteOrdinal(@Param() nftId: string, @Headers('Authorization') accessToken: string): Promise<any> {
    const { id: userId } = await verifyAccessToken(accessToken);
    const addressOwner = (await this.addressService.findAddressById(userId)).address.btc;

    const existedOrdinalOwner = (await this.ordinalService.findOrdinalByNftId(nftId)).owner;
    if (addressOwner !== existedOrdinalOwner) {
      throw new BadRequestException("Your request denied");
    }

    const existedOrdinal = await this.ordinalService.findOrdinalByNftId(nftId);
    if (!existedOrdinal) {
      throw new BadRequestException("Ordinal does not exist");
    }

    return this.ordinalService.deleteOrdinal(nftId);
  }
}
