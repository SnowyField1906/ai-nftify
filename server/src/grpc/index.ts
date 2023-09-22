export const PATH_GRPC_FOLDER = `${__dirname}/grpc/protos/`;

import { join } from "path";
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import P2PList from "../config/node-info/p2p-list";
import { GRPCService } from "./grpc-service";

const clients: any[] = Object.keys(P2PList).map((elm) => {
  return {
    name: `P2P_${elm.toUpperCase()}`,
    imports: [ConfigModule],
    useFactory: async () => {
      const host = P2PList[elm].url;
      return {
        transport: Transport.GRPC,
        options: {
          url: host,
          package: "p2p",
          protoPath: [join(PATH_GRPC_FOLDER, `/common.proto`)],
        },
      };
    },
    inject: [ConfigService],
  };
});

@Module({
  providers:[GRPCService]
})
export class LoadGrpcsModule {
  static register(): DynamicModule {
    return ClientsModule.registerAsync(clients);
  }
}
