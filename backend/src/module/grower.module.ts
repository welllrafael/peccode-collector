/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { GrowerController } from '../controller/grower.controller';
import { GrowerService } from '../service/grower.service';

@Module({
  providers: [GrowerService],
  controllers: [GrowerController]
})
export class GrowerModule {}
