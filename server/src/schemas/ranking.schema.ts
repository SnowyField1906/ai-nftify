import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RankingDocument = HydratedDocument<Ranking>;


@Schema()
export class Ranking {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true })
  numSold: Number;

  @Prop({ required: true })
  numPurchased: Number;

  @Prop({ required: true })
  numPromptSold: Number;

  @Prop({ required: true })
  numPromptPurchased: Number;
}

export const RankingSchema = SchemaFactory.createForClass(Ranking);
