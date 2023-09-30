import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Bridge, BridgeDocument } from "src/schemas";

@Injectable()
export class BridgeService {
  constructor(
    @InjectModel(Bridge.name)
    private bridgeModel: Model<BridgeDocument>) { }

  async createBridge(bridge: Bridge): Promise<Bridge> {
    return this.bridgeModel.create(bridge);

  }

  async findAll(): Promise<Array<Bridge>> {
    return this.bridgeModel.find();
  }

  async findById(id: string): Promise<Bridge> {
    return this.bridgeModel.findOne({ id });
  }

}
