import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KeyIndex, KeyIndexDocument } from './../schemas';

@Injectable()
export class KeyIndexService {
  constructor(@InjectModel(KeyIndex.name) private catModel: Model<KeyIndexDocument>) {}

  async create(data: any): Promise<KeyIndex> {
    const createKey = new this.catModel(data);
    return createKey.save();
  }

}
