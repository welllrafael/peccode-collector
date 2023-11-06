/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { SisbovController } from '../controller/sisbov.controller';
import { SisbovService } from '../service/sisbov.service';

@Module({
  providers: [SisbovService],
  controllers: [SisbovController]
})
export class SisbovModule {}
