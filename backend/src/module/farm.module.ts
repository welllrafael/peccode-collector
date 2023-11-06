/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { FarmController } from '../controller/farm.controller';
import { FarmService } from '../service/farm.service';

@Module({
  providers: [FarmService],
  controllers: [FarmController]
})
export class FarmModule {}
