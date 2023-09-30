import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ordinal, OrdinalDocument } from "src/schemas";
//EncryptedMetadata,
@Injectable()
export class OrdinalService {
  constructor(
    @InjectModel(Ordinal.name)
    private ordinalModel: Model<OrdinalDocument>,
  ) { }

  async getAllOrdinal(): Promise<Array<Ordinal>> {
    return this.ordinalModel.find();
  }

  async findOrdinalByNftId(nftId: string): Promise<Ordinal> {
    return this.ordinalModel.findOne({ nftId });
  }

  async findOrdinalByOwner(owner: string): Promise<Array<Ordinal>> {
    return this.ordinalModel.find({ owner });
  }
  async createOrdinal(ordinal: Ordinal): Promise<Ordinal> {
    return this.ordinalModel.create(ordinal);
  }

  async updateOrdinal(nftId: string, owner: string): Promise<any> {
    return this.ordinalModel.findOneAndUpdate({ nftId: nftId }, { owner: owner });
  }

  async deleteOrdinal(nftId: string): Promise<Ordinal> {
    return this.ordinalModel.findOneAndDelete({ nftId });
  }

}
