import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MetadataDocument = HydratedDocument<Metadata>;

export class Meta {
  H: number;
  W: number;
  enable_attention_slicing: string;
  file_prefix: string;
  guidance_scale: number;
  instant_response: string;
  model: string;
  n_samples: number;
  negative_prompt: string;
  outdir: string;
  prompt: string;
  revision: string;
  safetychecker: string;
  seed: number;
  steps: number;
  vae: string;
}

@Schema()
export class Metadata {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true })
  meta: Meta;


}

export const MetadataSchema = SchemaFactory.createForClass(Metadata);
