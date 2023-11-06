/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { BreedController } from '../controller/breed.controller';
import { BreedService } from '../service/breed.service';

@Module({
  providers: [BreedService],
  controllers: [BreedController]
})
export class BreedModule {}
