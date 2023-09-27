import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type StorageDocument = HydratedDocument<Storage>;

// export class EncryptedMetadata {
//   mac: string;
//   ciphertext: string;
//   iv: string;
//   ephemPublicKey: string;
// }

@Schema()
export class Storage {
  @Prop({ required: true, unique: true, index: true, sparse: true })
  nftId: string;

  @Prop({ required: true })
  nftName: string;

  @Prop({ required: true })
  thumbnail: string;

}

export const StorageSchema = SchemaFactory.createForClass(Storage);
