
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCommitmentDto } from "src/dtos/create-commitment.dto";
import { Commitment, CommitmentDocument } from "src/schemas/commitment.schema";

@Injectable()
export class CommitmentService {
  constructor(@InjectModel(Commitment.name) private commitmentModel: Model<CommitmentDocument>) {}

  async create(createCommitmentDto: CreateCommitmentDto): Promise<Commitment> {
    const newCommitment = new this.commitmentModel(createCommitmentDto);
    return newCommitment.save();
  }

  async findCommitment(commitment: string): Promise<Commitment> {
    return this.commitmentModel.findOne({ commitment }).exec();
  }
}
