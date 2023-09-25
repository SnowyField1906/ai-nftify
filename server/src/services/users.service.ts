import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas";
//EncryptedMetadata,
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  async findUserById(id: string): Promise<User> {
    return this.userModel.findOne({ id });
  }

  async createUser(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async findAll(): Promise<Array<User>> {
    return this.userModel.find();
  }

}
