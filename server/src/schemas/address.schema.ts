import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AddressDocument = HydratedDocument<Address>;

export class AddressType {
  btc: string;
  eth: string;
}

@Schema()
export class Address {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  address: AddressType;

  @Prop({ required: true })
  publicKey: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
