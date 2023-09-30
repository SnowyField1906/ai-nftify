import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Bitcoin, BitcoinDocument } from "src/schemas";
//EncryptedMetadata,
@Injectable()
export class BitcoinService {
  constructor(
    @InjectModel(Bitcoin.name)
    private bitcoinModel: Model<BitcoinDocument>,
  ) { }

  async findBitcoinById(address: string): Promise<Bitcoin> {
    return this.bitcoinModel.findOne({ address });
  }

  async updateBitcoin(): Promise<Bitcoin> {
    return this.bitcoinModel.findOneAndUpdate({ used: false }, { used: true });
  }

  async getAllBitcoin(): Promise<Array<Bitcoin>> {
    return this.bitcoinModel.find();
  }
}
