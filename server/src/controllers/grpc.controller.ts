import { GrpcMethod } from "@nestjs/microservices";
import { Controller, InternalServerErrorException } from "@nestjs/common";

import { SharedKeyService, WalletService } from "./../services";
import { GRPCService } from "src/grpc/grpc-service";
import {
  AddReceivedShareRequest,
  AddReceivedShareResponse,
  DeriveSharedSecretRequest,
  DeriveSharedSecretResponse,
  GenerateSharesRequest,
  GenerateSharesResponse,
  InitSecretRequest,
  InitSecretResponse,
  StoreWalletInfoRequest,
  StoreWalletInfoResponse,
} from "src/grpc/types";

@Controller("/grpc")
export class RGPCController {
  constructor(
    private grpcService: GRPCService,
    private sharedKeyService: SharedKeyService,
    private walletService: WalletService,
  ) {}

  @GrpcMethod("P2PService", "initSecret")
  async initSecret(data: InitSecretRequest): Promise<InitSecretResponse> {
    try {
      const publicKey = await this.sharedKeyService.initSecret(data.owner);
      return {
        publicKey,
      };
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException("Error when initSecret");
    }
  }

  @GrpcMethod("P2PService", "generateShares")
  async generateShares(data: GenerateSharesRequest): Promise<GenerateSharesResponse> {
    try {
      const status = await this.grpcService.generateShares(data.owner);
      return { status };
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException("Error when generateShares Controller");
    }
  }

  @GrpcMethod("P2PService", "addReceivedShare")
  async addReceivedShare(data: AddReceivedShareRequest): Promise<AddReceivedShareResponse> {
    const status = await this.sharedKeyService.updateReceivedShare(data.owner, data.receivedShare);
    return { status };
  }

  @GrpcMethod("P2PService", "deriveSharedSecret")
  async deriveSharedSecret(data: DeriveSharedSecretRequest): Promise<DeriveSharedSecretResponse> {
    const status = await this.sharedKeyService.deriveSecretSharedKey(data.owner);
    return { status };
  }

  @GrpcMethod("P2PService", "storeWalletInfo")
  async storeWalletInfo(data: StoreWalletInfoRequest): Promise<StoreWalletInfoResponse> {
    await this.walletService.createWallet(data.owner, data.publicKey, data.address);
    // await this.sharedKeyService.addWalletIdRef(data.owner, newWallet._id);
    return { status: true };
  }
}
