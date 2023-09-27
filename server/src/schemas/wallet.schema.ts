import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ required: true, lowercase: true, trim: true, unique: true, index: true })
  owner: string;

  @Prop()
  publicKey: string;

  @Prop()
  address: string;

  constructor(owner: string, publicKey: string, address: string) {
    this.owner = owner;
    this.publicKey = publicKey;
    this.address = address;
  }

}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
