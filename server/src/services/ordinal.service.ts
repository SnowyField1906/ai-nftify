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

  async findOrdinalByUserId(userId: string): Promise<Array<Ordinal>> {
    return this.ordinalModel.find({ userId });
  }

  async findOrdinalByOrdId(ordId: string): Promise<Array<Ordinal>> {
    return this.ordinalModel.find({ ordId });
  }

  async updateOrdinal(ordinal: Ordinal): Promise<any> {
    return this.ordinalModel.findOneAndUpdate({ ordId: ordinal.ordId }, ordinal);
  }

  async getAllOrdinal(): Promise<Array<Ordinal>> {
    return this.ordinalModel.find();
  }

  async deleteOrdinal(ordId: string): Promise<any> {
    return this.ordinalModel.findOneAndDelete({ ordId: ordId });
  }
  async createOrdinal(ordinal: Ordinal): Promise<Ordinal> {
    return this.ordinalModel.create(ordinal);
  }
}
