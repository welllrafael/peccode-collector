import { Module } from '@nestjs/common';
import { AreaController } from '../controller/area.controller';
import { AreaService } from '../service/area.service';

@Module({
  providers: [AreaService],
  controllers: [AreaController]
})
export class AreaModule {}
