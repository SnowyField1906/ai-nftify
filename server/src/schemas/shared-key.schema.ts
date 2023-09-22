import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type SharedKeyDocument = HydratedDocument<SharedKey>;

@Schema({ timestamps: true })
export class SharedKey {
  @Prop()
  secret: string;

  @Prop({ type: Types.ObjectId, ref: "Wallet" })
  walletId: string;

  @Prop()
  owner: string;

  @Prop()
  receivedShares: [string];

  @Prop()
  sharedSecret: string;
}

export const SharedKeySchema = SchemaFactory.createForClass(SharedKey);
