/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { InputMovementController } from '../controller/inputMovement.controller';
import { InputMovementService } from '../service/inputMovement.service';

@Module({
  providers: [InputMovementService],
  controllers: [InputMovementController]
})
export class InputMovementModule {}
