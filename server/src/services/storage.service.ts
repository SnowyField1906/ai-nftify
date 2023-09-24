import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Storage, StorageDocument } from "src/schemas";
//EncryptedMetadata,
@Injectable()
export class StorageService {
  constructor(
    @InjectModel(Storage.name)
    private storageModel: Model<StorageDocument>,
  ) { }

  async findMetadataByOwner(nftId: string): Promise<Storage> {
    return this.storageModel.findOne({ nftId });
  }

  async createMetadata(storage: Storage): Promise<Storage> {
    return this.storageModel.create(storage);
  }

  async findAllMetadata(): Promise<Array<Storage>> {
    return this.storageModel.find();
  }

  // async updatePriceMetadata(nftId: string, encryptedMetadata: EncryptedMetadata) {
  //   return this.storageModel.updateOne({ nftId }, { encryptedMetadata });
  // }
}
