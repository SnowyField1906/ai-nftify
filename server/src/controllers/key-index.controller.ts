import { ClientGrpc, GrpcMethod } from "@nestjs/microservices";
import { Body, Controller, Inject, Post } from "@nestjs/common";

import { KeyIndex } from "./../schemas";
import { KeyIndexService } from "./../services";
import { KeyAssignDto } from "./../dtos/key-index.dto";
import { GRPCService } from "src/grpc/grpc-service";

import { BroadcastAssignKeyRequest, BroadcastAssignKeyResponse } from "src/grpc/types";

@Controller("/key-index")
export class KeyIndexController {
  constructor(private keyIndexService: KeyIndexService, private grpcService: GRPCService) {}

  @GrpcMethod("P2PService", "broadcastAssignKey")
  async broadcastAssignKey(data: BroadcastAssignKeyRequest): Promise<BroadcastAssignKeyResponse> {
    return {
      ...data,
      name: ""
    };
  }

  @Post()
  async post(@Body() body: KeyAssignDto): Promise<KeyIndex | any> {
    this.grpcService.broadcastAll();

  }
}
