import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  NotFoundException,
  BadRequestException,
  Delete,
} from "@nestjs/common";
import { secp256k1 } from "src/common/secp256k1";
import { CreateStorageDto } from "src/dtos/create-storage.dto";
import { UpdateStorageDto } from "src/dtos/update-storage.dto";
import { StorageService } from "src/services";
import { createKeccak256 } from "src/utils/wallet";
import { Storage } from "src/schemas";

@Controller("storages")
export class StorageController {
  constructor(private readonly storageService: StorageService) { }

  @Get(":owner")
  async getMetadata(@Param("owner") owner: string): Promise<Array<Storage>> {
    const metadata = await this.storageService.findMetadataByOwner(owner);
    if (!metadata) {
      throw new NotFoundException(`Can not find metadata with ${owner}`);
    }
    return metadata;
  }

  @Get()
  async getAllMetadata(): Promise<Array<Storage>> {
    const metadata = await this.storageService.findAllMetadata();
    if (!metadata) {
      throw new NotFoundException(`Empty metadata`);
    }
    return metadata;
  }

  @Post()
  async createMetadata(@Body() createStorage: CreateStorageDto): Promise<Storage> {
    const existedMetadata = await this.storageService.findMetadataByNfts(createStorage.nftId);
    if (existedMetadata) {
      throw new BadRequestException("Metadata already exists");
    }

    return this.storageService.createMetadata(createStorage);
  }

  @Put()
  async updateMetadata(@Body() updateStorage: UpdateStorageDto): Promise<any> {
    const existedMetadata = await this.storageService.findMetadataByOwner(updateStorage.nftId);
    if (!existedMetadata) {
      throw new BadRequestException("Metadata does not exist");
    }

    return this.storageService.updateMetadata(updateStorage.nftId, updateStorage);
  }

  @Delete()
  async deleteMetadata(@Body() userId: string, nftId: string): Promise<any> {
    const existedMetadata = await this.storageService.findMetadataByNfts(nftId);
    if (!existedMetadata) {
      throw new BadRequestException("Metadata does not exist");
    }
    if (userId !== existedMetadata.userId) {
      throw new BadRequestException("Your request denied");
    }
    return this.storageService.deleteMetadata(nftId);
  }

}
