import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Metadata, MetadataDocument } from "src/schemas";
import { User, Wallet } from "src/schemas";
import { UserService } from "./users.service";
import { WalletService } from "./wallet.service";
//EncryptedMetadata,
@Injectable()
export class MetadataService {
  constructor(
    @InjectModel(Metadata.name)
    private metadataModel: Model<MetadataDocument>,
    private userService: UserService,
    private walletService: WalletService
  ) { }

  async findMetadataById(id: string): Promise<Metadata> {
    return this.metadataModel.findOne({ id });
  }

  async createMetadata(metadata: Metadata): Promise<Metadata> {
    return this.metadataModel.create(metadata);
  }
  async getAddressFromUserId(id: string): Promise<string> {
    const infoUser: User = await this.userService.findUserById(id);
    if (!infoUser) return "Don't have this user";
    const walletUser: Wallet = await this.walletService.findWallet(infoUser.email);
    if (!walletUser) return "Don't have this wallet";
    return walletUser.address;
  }

  async updateMetadata(oldId: string, newId: string): Promise<any> {
    return this.metadataModel.findOneAndUpdate({ id: oldId }, { id: newId });
  }

}
