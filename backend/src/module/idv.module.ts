/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { IdvController } from '../controller/idv.controller';
import { IdvService } from '../service/idv.service';

@Module({
  providers: [IdvService],
  controllers: [IdvController]
})
export class IdvModule {}
