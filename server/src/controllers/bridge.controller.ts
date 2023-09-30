import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  NotFoundException,
  Headers,
  BadRequestException,
  Delete,
} from "@nestjs/common";
import { CreateBridgeDto } from "src/dtos/create-bridge.dto";
import { BridgeService, OrdinalService, AddressService, MetadataService, StorageService } from "src/services";
import { Bridge } from "src/schemas";
import { verifyAccessToken } from "src/verifier/oauth.verifier";
import { getOwnerOfNft } from "src/utils/blockchain";
type Test = {
  id: string;
}
@Controller("bridges")
export class BridgeController {
  constructor(
    private readonly bridgeService: BridgeService,
    private readonly ordinalService: OrdinalService,
    private readonly addressService: AddressService,
    private readonly metadataService: MetadataService,
    private readonly storageService: StorageService,
  ) { }

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
  async createMetadata(@Body() createBridge: CreateBridgeDto, @Headers('Authorization') accessToken: string): Promise<Bridge> {
    const { id: userId } = await verifyAccessToken(accessToken);
    const userOwner = (await this.ordinalService.findOrdinalByNftId(createBridge.ordId)).owner;
    const idUserOwner = (await this.addressService.findUserByAddressBTC(userOwner)).id;
    if (userId !== idUserOwner) {
      throw new BadRequestException("Your are not owner");
    }

    const existedBridgeNftId = await this.bridgeService.findByNftId(createBridge.nftId);
    if (existedBridgeNftId) {
      throw new BadRequestException("Metadata already exists");
    }
    const existedBridgeOrdId = await this.bridgeService.findByOrdId(createBridge.ordId);
    if (existedBridgeOrdId) {
      throw new BadRequestException("Metadata already exists");
    }
    await this.metadataService.updateMetadata(createBridge.ordId, createBridge.nftId).catch(e => {
      throw new BadRequestException("Error", e);
    })
    await this.storageService.updateNewId(createBridge.ordId, createBridge.nftId).catch(e => {
      throw new BadRequestException("Error", e);
    })
    await this.ordinalService.deleteOrdinal(createBridge.ordId).catch(e => {
      throw new BadRequestException("Error", e);
    });;
    return this.bridgeService.createBridge(createBridge);
  }

  @Delete(":id")
  async deleteOrdinal(@Param() id: Test, @Headers('Authorization') accessToken: string): Promise<any> {
    const { id: userId } = await verifyAccessToken(accessToken).catch(
      e => {
        throw new BadRequestException("Your need login", e);
      }
    );
    const ordId = id.id;
    const nft = await this.bridgeService.findByOrdId(ordId).catch(e => {
      console.log(e);
      throw new BadRequestException("Error findByOrdId");
    });
    const ownerNftIdAddress = await getOwnerOfNft(nft.nftId);

    const userOwner = await this.addressService.findUserByAddress(ownerNftIdAddress).catch(
      e => {
        console.log(e);
        throw new BadRequestException("Error findUserByAddressBTC", e);
      }
    );

    if (userId !== userOwner.id) {
      throw new BadRequestException("Your are not owner");
    }
    const existedOrdinal = await this.ordinalService.findOrdinalByNftId(nft.nftId);
    if (existedOrdinal) {
      throw new BadRequestException("Ordinal already exists");
    }
    await this.metadataService.updateMetadata(nft.nftId, ordId).catch(e => {
      throw new BadRequestException("Error", e);
    });
    await this.storageService.updateNewId(nft.nftId, ordId).catch(e => {
      throw new BadRequestException("Error", e);
    });

    await this.ordinalService.createOrdinal({
      nftId: ordId,
      owner: userOwner.address.btc,
      price: 0,
      promptPrice: 0,
      promptBuyer: [userOwner.address.btc],
    }).catch(e => {
      throw new BadRequestException("Error", e);
    });
    return this.bridgeService.deleteBridge(nft.nftId);
  }
}
