import {
  Controller,
  Get,
  Param,
  Post,
  Headers,
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
import { verifyAccessToken } from "src/verifier/oauth.verifier";
@Controller("storages")
export class StorageController {
  constructor(private readonly storageService: StorageService) { }

  @Get(":owner")
  async getMetadata(@Param("owner") id: string): Promise<Storage> {
    const metadata = await this.storageService.findMetadataByNfts(id);
    if (!metadata) {
      throw new NotFoundException(`Can not find metadata with ${id}`);
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

  // @Put()
  // async updateMetadata(@Body() updateStorage: UpdateStorageDto, @Headers('Authorization') accessToken: string): Promise<any> {
  //   const { id: userId } = await verifyAccessToken(accessToken);
  //   if (!userId) {
  //     throw new BadRequestException("Your need login");
  //   }
  //   const existedMetadata = await this.storageService.findMetadataByNfts(updateStorage.nftId);
  //   if (!existedMetadata) {
  //     throw new BadRequestException("Metadata does not exist");
  //   }

  //   if (existedMetadata.thumbnail !== updateStorage.thumbnail) {
  //     throw new BadRequestException("Don't change thumbnail");
  //   }
  //   if (existedMetadata.nftId !== updateStorage.nftId) {
  //     throw new BadRequestException("Don't change nftId");
  //   }
  //   return this.storageService.updateMetadata(updateStorage.nftId, updateStorage);
  // }

  // @Delete()
  // async deleteMetadata(@Body() nftId: string, @Headers('Authorization') accessToken: string): Promise<any> {
  //   const { id: userId } = await verifyAccessToken(accessToken);
  //   const existedMetadata = await this.storageService.findMetadataByNfts(nftId);
  //   if (!existedMetadata) {
  //     throw new BadRequestException("Metadata does not exist");
  //   }
  //   if (userId !== existedMetadata.userId) {
  //     throw new BadRequestException("Your request denied");
  //   }
  //   return this.storageService.deleteMetadata(nftId);
  // }

}
