import { Body, Controller, Get, Post, UseGuards, UseInterceptors, Param } from "@nestjs/common";
import { LookupWalletDto } from "src/dtos/lookup-wallet.dto";
import { GRPCService } from "src/grpc/grpc-service";
import { Bitcoin } from "src/schemas";
import { BitcoinService } from "src/services";
import { VerifyGuard } from "src/verifier/verify.guard";

@Controller("bitcoins")
export class BitcoinController {
  constructor(private readonly bitcoinService: BitcoinService) { }
  @Get()
  async getBitcoin(): Promise<Bitcoin> {
    return this.bitcoinService.updateBitcoin();
  }

}
