import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Address, AddressDocument } from "src/schemas";
//EncryptedMetadata,
@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private addressModel: Model<AddressDocument>,
  ) { }

  async findAddressById(id: string): Promise<Address> {
    return this.addressModel.findOne({ id });
  }
  async findAddressByEmail(email: string): Promise<Address> {
    return this.addressModel.findOne({ email });
  }
  async findUserByAddress(addressETH: string): Promise<Address> {
    return this.addressModel.findOne({ 'address.eth': addressETH }).exec();
  }

  async createAddress(address: Address): Promise<Address> {
    return this.addressModel.create(address);
  }

  async getAllAddress(): Promise<Array<Address>> {
    return this.addressModel.find();
  }
}
