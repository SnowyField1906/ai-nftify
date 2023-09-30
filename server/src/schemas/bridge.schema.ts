import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BridgeDocument = HydratedDocument<Bridge>;

@Schema()
export class Bridge {
    @Prop({ required: true, unique: true, index: true })
    nftId: string;

    @Prop({ required: true, unique: true, index: true })
    ordId: string;
}

export const BridgeSchema = SchemaFactory.createForClass(Bridge);
