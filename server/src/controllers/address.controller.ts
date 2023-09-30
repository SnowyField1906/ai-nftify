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
} from "@nestjs/common";
import { CreateAddressDto } from "src/dtos/create-address.dto";
import { AddressService } from "src/services";
import { Address, AddressType } from "src/schemas";
import { verifyAccessToken } from "src/verifier/oauth.verifier";

@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) { }
  @Post()
  async createAddress(@Body() createAddress: CreateAddressDto, @Headers('Authorization') accessToken: string): Promise<Address> {
    const existedAddress = await this.addressService.findAddressById(createAddress.id);
    if (existedAddress) {
      throw new BadRequestException("Address already exists");
    }
    const { id: userId } = await verifyAccessToken(accessToken);
    if (userId !== createAddress.id) {
      throw new BadRequestException("Address not match");
    }
    return this.addressService.createAddress(createAddress);
  }
  @Get(":id")
  async getAddressByEmailOrId(@Param("id") id: string): Promise<Address> {
    const infoById = await this.addressService.findAddressById(id);
    if (!infoById) {
      const infoByEmail = await this.addressService.findAddressByEmail(id);
      if (!infoByEmail) {
        const infoByAddress = (await this.addressService.findUserByAddress(id));
        if (!infoByAddress) {
          const infoByAddressBTC = (await this.addressService.findUserByAddressBTC(id));
          if (!infoByAddressBTC) {
            throw new NotFoundException(`Can not find address with ${id}`);
          }
          return infoByAddressBTC;
        }
        return infoByAddress;
      }
      return infoByEmail;
    }
    return infoById;
  }
  @Get()
  async getAllAddress(): Promise<Array<Address>> {
    const info = await this.addressService.getAllAddress();
    if (!info) {
      throw new NotFoundException(`Empty address`);
    }
    return info;
  }
}
