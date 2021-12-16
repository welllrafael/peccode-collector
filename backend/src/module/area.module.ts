import { Module } from '@nestjs/common';
import { AreaService } from '../service/area.service';

@Module({
  providers: [AreaService]
})
export class AreaModule {}
