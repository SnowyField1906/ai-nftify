import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { HttpModule } from "@nestjs/axios";
import type { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";

import { LoadGrpcsModule } from "./grpc";

import * as services from "./services";
import * as controllers from "./controllers";
import configuration from "./config/configuration";
import { GoogleVerifier } from "./verifier/google.verifier";

import {
  Commitment,
  CommitmentSchema,
  KeyIndex,
  KeyIndexSchema,
  Wallet,
  WalletSchema,
  Storage,
  StorageSchema,
  SharedKey,
  SharedKeySchema,
  User,
  UserSchema,
  Metadata,
  MetadataSchema,
  Address,
  AddressSchema,
  Ranking,
  RankingSchema,
  Ordinal,
  OrdinalSchema,
  Bitcoin,
  BitcoinSchema,
  Bridge,
  BridgeSchema
} from "./schemas";
import { GRPCService } from "./grpc/grpc-service";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: `${process.cwd()}/src/config/node-info/${process.env.NODE_NAME}.env`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>("database.mongo_url"),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: KeyIndex.name, schema: KeyIndexSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: Commitment.name, schema: CommitmentSchema },
      { name: SharedKey.name, schema: SharedKeySchema },
      { name: Storage.name, schema: StorageSchema },
      { name: User.name, schema: UserSchema },
      { name: Metadata.name, schema: MetadataSchema },
      { name: Address.name, schema: AddressSchema },
      { name: Ranking.name, schema: RankingSchema },
      { name: Ordinal.name, schema: OrdinalSchema },
      { name: Bitcoin.name, schema: BitcoinSchema },
      { name: Bridge.name, schema: BridgeSchema }
    ]),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<any> => {
        const redisUrl = configService.get<string>("redis_url");
        return {
          store: redisStore,
          url: redisUrl,
          isGlobal: true,
        };
      },
      inject: [ConfigService],
    }),
    LoadGrpcsModule.register(),
  ],
  controllers: [].concat(Object.values(controllers)),

  providers: [].concat(Object, GRPCService, Object.values(services), GoogleVerifier),
})
export class AppModule { }
