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
import { RankingService } from "src/services";
import { Ranking } from "src/schemas";
import { CreateRankingsDto } from "src/dtos/create-and-update-ranking.dto";
import { verifyAccessToken } from "src/verifier/oauth.verifier";

@Controller("rankings")
export class RankingController {
  constructor(private readonly rankingService: RankingService) { }

  @Get(":id")
  async getRankingById(@Param("id") id: string): Promise<Ranking> {
    const ranking = await this.rankingService.findRankingById(id);
    if (!ranking) {
      throw new NotFoundException(`Can not find ranking with ${id}`);
    }
    return ranking;
  }
  @Get()
  async getAllRanking(): Promise<Array<Ranking>> {
    const ranking = await this.rankingService.getAllRanking()
    if (!ranking) {
      throw new NotFoundException(`Empty ranking`);
    }
    return ranking;
  }

  @Put()
  async updateRanking(@Body() updateRanking: CreateRankingsDto, @Headers('Authorization') accessToken: string): Promise<any> {
    const { id: userId } = await verifyAccessToken(accessToken);
    if (!userId) {
      throw new BadRequestException("Your need login");
    }
    const existedMetadata = await this.getRankingById(updateRanking.id);
    if (!existedMetadata) {
      throw new BadRequestException("Ranking does not exist");
    }

    return this.rankingService.updateRanking(updateRanking);
  }
}
