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
} from "@nestjs/common";
import { CreateMetadataDto } from "src/dtos/create-metadata.dto";
import { MetadataService } from "src/services";
import { Metadata, User } from "src/schemas";
import { getCurrentPromptBuyer, getCurrentPromptPrice } from "src/utils/blockchain";
import { verifyAccessToken } from "src/verifier/oauth.verifier";
@Controller("metadatas")
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) { }
  @Post()
  async createMetadata(@Body() createMetadata: CreateMetadataDto): Promise<Metadata> {
    const existedMetadata = await this.metadataService.findMetadataById(createMetadata.id);
    if (existedMetadata) {
      throw new BadRequestException("Metadata already exists");
    }
    return this.metadataService.createMetadata(createMetadata);
  }
  @Get(":id")
  async getMetadataByNft(@Param("id") id: string, @Headers('Authorization') accessToken: string): Promise<Metadata> {
    const metadata = await this.metadataService.findMetadataById(id);
    if (!metadata) {
      throw new NotFoundException(`Can not find metadata with ${id}`);
    }
    const pricePrompt = await getCurrentPromptPrice(id);
    if (pricePrompt === 0) {
      return metadata;
    }
    const { id: userId } = await verifyAccessToken(accessToken);
    const listAccessUsers = await getCurrentPromptBuyer(id);
    const addressUserRequest = await this.metadataService.getAddressFromUserId(userId);

    const access = listAccessUsers.find(result => result === addressUserRequest);
    if (!access) {
      throw new NotFoundException(`Your request denied ${id}`);
    }
    return metadata;
  }
}
