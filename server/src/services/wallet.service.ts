import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Wallet, WalletDocument } from "src/schemas";

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<WalletDocument>) {}

  // async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
  //   const createdWallet = new this.walletModel(createWalletDto);
  //   return createdWallet.save();
  // }

  async findAll(): Promise<Wallet[]> {
    return this.walletModel.find().exec();
  }

  async findWallet(owner: string): Promise<Wallet> {
    return this.walletModel.findOne({ owner }).exec();
  }

  async createWallet(owner: string, publicKey: string, address: string): Promise<Wallet> {
    let newWallet = new Wallet(owner, publicKey, address);
    return this.walletModel.create(newWallet);
  }

  async dropAllWalletsByOwner(owner: string): Promise<any> {
    return this.walletModel.deleteMany({ owner });
  }
}
