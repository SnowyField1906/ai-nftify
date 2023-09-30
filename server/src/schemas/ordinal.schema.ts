import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type OrdinalDocument = HydratedDocument<Ordinal>;

@Schema()
export class Ordinal {
  @Prop({ required: true, unique: true, index: true })
  nftId: string;

  @Prop({ required: true })
  owner: string;

  @Prop()
  price: Number;

  @Prop()
  promptPrice: Number;

  @Prop({ required: true })
  promptBuyer: Array<string>;
}

export const OrdinalSchema = SchemaFactory.createForClass(Ordinal);
