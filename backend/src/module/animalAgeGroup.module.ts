/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { AnimalAgeGroupController } from '../controller/animalAgeGroup.controller';
import { AnimalAgeGroupService } from '../service/animalAgeGroup.service';

@Module({
  providers: [AnimalAgeGroupService],
  controllers: [AnimalAgeGroupController]
})
export class AnimalAgeGroupModule {}
