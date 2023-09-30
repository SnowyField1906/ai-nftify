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

  async findMetadataByOwner(userId: string): Promise<Array<Storage>> {
    return this.storageModel.find({ userId });
  }

  async findMetadataByNfts(nftId: string): Promise<Storage> {
    return this.storageModel.findOne({ nftId });
  }

  async createMetadata(storage: Storage): Promise<Storage> {
    return this.storageModel.create(storage);
  }

  async findAllMetadata(): Promise<Array<Storage>> {
    return this.storageModel.find();
  }

  async updateMetadata(nftId: string, newNftId: string) {
    return this.storageModel.findOneAndUpdate({ nftId }, { nftId: newNftId });
  }

  async deleteMetadata(nftId: string) {
    return this.storageModel.findOneAndDelete({ nftId })
  }
}
