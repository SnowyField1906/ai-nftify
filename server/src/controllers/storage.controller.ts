import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  NotFoundException,
  BadRequestException,
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
  async getMetadata(@Param("owner") owner: string): Promise<Storage> {
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
    const existedMetadata = await this.storageService.findMetadataByOwner(createStorage.nftId);
    if (existedMetadata) {
      throw new BadRequestException("Metadata already exists");
    }

    // const validSig = this.verifySignature(
    //   createStorage.encryptedMetadata,
    //   createStorage.signature,
    //   createStorage.publicKey,
    // );
    // if (!validSig) {
    //   throw new BadRequestException("Signature is not valid");
    // }

    return this.storageService.createMetadata(createStorage);
  }

  // @Put()
  // async updateMetadata(@Body() updateStorage: UpdateStorageDto): Promise<any> {
  //   const existedMetadata = await this.storageService.findMetadataByOwner(updateStorage.owner);
  //   if (!existedMetadata) {
  //     throw new BadRequestException("Metadata does not exist");
  //   }

  //   const validSig = this.verifySignature(
  //     updateStorage.encryptedMetadata,
  //     updateStorage.signature,
  //     existedMetadata.publicKey,
  //   );
  //   if (!validSig) {
  //     throw new BadRequestException("Signature is not valid");
  //   }

  //   return this.storageService.updateMetadata(updateStorage.owner, updateStorage.encryptedMetadata);
  // }

  // verifySignature(metadata: EncryptedMetadata, signature: string, publicKey: string): boolean {
  //   const msg = createKeccak256(JSON.stringify(metadata));
  //   return secp256k1.verify(msg, signature, Buffer.from(publicKey, "hex"));
  // }
}
