/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { IdeController } from '../controller/ide.controller';
import { IdeService } from '../service/ide.service';

@Module({
  providers: [IdeService],
  controllers: [IdeController]
})
export class IdeModule {}
