/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { AnimalController } from '../controller/animal.controller';
import { AnimalService } from '../service/animal.service';

@Module({
  providers: [AnimalService],
  controllers: [AnimalController]
})
export class AnimalModule {}
