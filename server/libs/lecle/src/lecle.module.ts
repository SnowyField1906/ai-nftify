import { Module } from '@nestjs/common';
import { LecleService } from './lecle.service';

@Module({
  providers: [LecleService],
  exports: [LecleService],
})
export class LecleModule {}
