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
    const info = await this.bridgeService.findById(id);
    if (!info) {
      throw new NotFoundException(`Can not find metadata with ${id}`);
    }
    return info;
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
    const existedBridgeNftId = await this.bridgeService.findById(createBridge.nftId);
    if (existedBridgeNftId) {
      throw new BadRequestException("Metadata already exists");
    }
    const existedBridgeOrdId = await this.bridgeService.findById(createBridge.ordId);
    if (existedBridgeOrdId) {
      throw new BadRequestException("Metadata already exists");
    }

    return this.bridgeService.createBridge(createBridge);
  }

}
