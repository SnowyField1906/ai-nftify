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
  @Prop({ required: true })
  userId: string;


  @Prop({ required: true })
  nftId: string;

  @Prop({ required: true })
  nftName: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  listing: boolean;

  @Prop({ required: true })
  isRootStock: boolean;

  @Prop({ required: true })
  privateMeta: boolean;

  @Prop({ required: true, type: Array<string> })
  allowedUsers: Array<string>
  // @Prop({ required: true, type: EncryptedMetadata })
  // encryptedMetadata: EncryptedMetadata;
}

export const StorageSchema = SchemaFactory.createForClass(Storage);
