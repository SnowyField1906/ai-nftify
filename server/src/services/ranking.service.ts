import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ranking, RankingDocument } from "src/schemas";
//EncryptedMetadata,
@Injectable()
export class RankingService {
  constructor(
    @InjectModel(Ranking.name)
    private rankingModel: Model<RankingDocument>,
  ) { }

  async findRankingById(id: string): Promise<Ranking> {
    return this.rankingModel.findOne({ id });
  }

  async createRanking(ranking: Ranking): Promise<Ranking> {
    return this.rankingModel.create(ranking);
  }

  async updateRanking(ranking: Ranking): Promise<any> {
    return this.rankingModel.findOneAndUpdate({ id: ranking.id }, ranking);
  }

  async getAllRanking(): Promise<Array<Ranking>> {
    return this.rankingModel.find();
  }
}
