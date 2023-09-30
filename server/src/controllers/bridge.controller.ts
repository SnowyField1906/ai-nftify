import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { CreateBridgeDto } from "src/dtos/create-bridge.dto";
import { BridgeService } from "src/services";
import { Bridge } from "src/schemas";

@Controller("bridges")
export class BridgeController {
  constructor(private readonly bridgeService: BridgeService) { }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<Bridge> {
    const infoNtfId = await this.bridgeService.findByNftId(id);
    if (!infoNtfId) {
      const infoOrdId = await this.bridgeService.findByOrdId(id);
      if (!infoOrdId) {
        throw new NotFoundException(`Can not find metadata with ${id}`);
      }
      return infoOrdId;
    }
    return infoNtfId;
  }

  @Get()
  async getAllUsers(): Promise<Array<Bridge>> {
    const info = await this.bridgeService.findAll()
    if (!info) {
      throw new NotFoundException(`Empty metadata`);
    }
    return info;
  }

  @Post()
  async createMetadata(@Body() createBridge: CreateBridgeDto): Promise<Bridge> {
    const existedBridgeNftId = await this.bridgeService.findByNftId(createBridge.nftId);
    if (existedBridgeNftId) {
      throw new BadRequestException("Metadata already exists");
    }
    const existedBridgeOrdId = await this.bridgeService.findByOrdId(createBridge.ordId);
    if (existedBridgeOrdId) {
      throw new BadRequestException("Metadata already exists");
    }

    return this.bridgeService.createBridge(createBridge);
  }

}
