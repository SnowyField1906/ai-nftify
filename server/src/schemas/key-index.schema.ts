import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type KeyIndexDocument = HydratedDocument<KeyIndex>;

@Schema()
export class KeyIndex {
  @Prop()
  index: string; //random short string

  @Prop()
  address: string;

  @Prop()
  publicKey: string;

  @Prop()
  publicKeyX: string;

  @Prop()
  publicKeyY: string;

  @Prop({ lowercase: true, required: true, trim: true })
  owner: string;
}

export const KeyIndexSchema = SchemaFactory.createForClass(KeyIndex);
