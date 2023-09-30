import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type OrdinalDocument = HydratedDocument<Ordinal>;


@Schema()
export class Ordinal {
  @Prop()
  nftId: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true, index: true })
  ordId: string;

  @Prop({ required: true })
  thumbnail: string;
}

export const OrdinalSchema = SchemaFactory.createForClass(Ordinal);
