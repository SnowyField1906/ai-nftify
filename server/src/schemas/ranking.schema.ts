import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AddressDocument = HydratedDocument<Address>;


@Schema()
export class Address {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true })
  numSold: Number;

  @Prop({ required: true })
  numPurchased: Number;

  @Prop({ required: true })
  numPromptSold: Number;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
