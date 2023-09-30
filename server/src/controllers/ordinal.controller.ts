import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  NotFoundException,
  Headers,
  BadRequestException,
  Delete,
} from "@nestjs/common";
import { OrdinalDto } from "src/dtos/create-and-update-ordinal.dto";
import { OrdinalService } from "src/services";
import { Ordinal } from "src/schemas";
import { verifyAccessToken } from "src/verifier/oauth.verifier";

@Controller("ordinals")
export class OrdinalController {
  constructor(private readonly ordinalService: OrdinalService) { }
  @Post()
  async createOrdinal(@Body() createOrdinal: OrdinalDto, @Headers('Authorization') accessToken: string): Promise<Ordinal> {
    const existedAddress = await this.ordinalService.findOrdinalByOrdId(createOrdinal.ordId);
    if (existedAddress) {
      throw new BadRequestException("Address already exists");
    }
    const { id: userId } = await verifyAccessToken(accessToken);
    if (userId !== createOrdinal.userId) {
      throw new BadRequestException("You are not owner");
    }
    return this.ordinalService.createOrdinal(createOrdinal);
  }
  @Get(":id")
  async getOrdinalById(@Param("id") id: string): Promise<Array<Ordinal>> {
    const infoByOrdId = await this.ordinalService.findOrdinalByOrdId(id);
    if (!infoByOrdId) {
      const infoByUserId = await this.ordinalService.findOrdinalByUserId(id);
      if (!infoByUserId) {
        throw new NotFoundException(`Can not find ordinal with ${id}`);
      }
      return infoByUserId;
    }
    return infoByOrdId;
  }
  @Get()
  async getAllOrdinal(): Promise<Array<Ordinal>> {
    const allOrdinal = await this.ordinalService.getAllOrdinal()
    if (!allOrdinal) {
      throw new NotFoundException(`Empty address`);
    }
    return allOrdinal;
  }
  @Put()
  async updateOrdinal(@Body() updateOrdinal: OrdinalDto, @Headers('Authorization') accessToken: string): Promise<any> {
    const { id: userId } = await verifyAccessToken(accessToken);
    if (!userId) {
      throw new BadRequestException("Your need login");
    }
    const accessUser = await this.ordinalService.findOrdinalByUserId(userId);
    let access = false;
    accessUser.forEach(user => {
      if (user.ordId === updateOrdinal.ordId) {
        access = true;
      }
    })
    if (!access) {
      throw new BadRequestException("You are not owner");
    }

    const existedOrdinal = await this.ordinalService.findOrdinalByOrdId(updateOrdinal.ordId);
    if (!existedOrdinal) {
      throw new BadRequestException("Ordinal does not exist");
    }
    return this.ordinalService.updateOrdinal(updateOrdinal);
  }

  @Delete(":id")
  async deleteOrdinal(@Param() ordId: string, @Headers('Authorization') accessToken: string): Promise<any> {
    const { id: userId } = await verifyAccessToken(accessToken);
    const accessUser = await this.ordinalService.findOrdinalByUserId(userId);
    let access = false;
    accessUser.forEach(user => {
      if (user.ordId === ordId) {
        access = true;
      }
    })
    if (!access) {
      throw new BadRequestException("You are not owner");
    }
    const existedOrdinal = await this.ordinalService.findOrdinalByOrdId(ordId);
    if (!existedOrdinal) {
      throw new BadRequestException("Ordinal does not exist");
    }

    return this.ordinalService.deleteOrdinal(ordId);
  }
}
