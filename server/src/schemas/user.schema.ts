import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true, index: true, sparse: true })
  id: string;


  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  verified_email: boolean;

  @Prop({ required: true })
  name: string;

  @Prop()
  given_name: string;

  @Prop()
  family_name: string;

  @Prop({ required: true })
  picture: string;

  @Prop({ required: true })
  locale: string;


}

export const UserSchema = SchemaFactory.createForClass(User);
