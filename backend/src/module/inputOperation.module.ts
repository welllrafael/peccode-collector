/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { InputOperationController } from '../controller/inputOperation.controller';
import { InputOperationService } from '../service/inputOperation.service';

@Module({
  providers: [InputOperationService],
  controllers: [InputOperationController]
})
export class InputOperationModule {}
