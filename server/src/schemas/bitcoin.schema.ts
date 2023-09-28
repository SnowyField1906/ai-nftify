import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BitcoinDocument = HydratedDocument<Bitcoin>;


@Schema()
export class Bitcoin {
  @Prop({ required: true, unique: true, index: true })
  address: string;

  @Prop({ required: true })
  used: boolean;
}

export const BitcoinSchema = SchemaFactory.createForClass(Bitcoin);
