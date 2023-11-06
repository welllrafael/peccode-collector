/* istanbul ignore file */
import { AnimalAgeGroupModule } from './module/animalAgeGroup.module';
import { AddressModule } from './module/address.module';
import { Module } from '@nestjs/common';
import { FarmModule } from './module/farm.module';
import { GrowerModule } from './module/grower.module';
import { AuthModule } from './module/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BreedModule } from './module/breed.module';
import { AnimalModule } from './module/animal.module';
import { SisbovModule } from './module/sisbov.module';
import { IdeModule } from './module/ide.module';
import { IdvModule } from './module/idv.module';
import { TraceabilityModule } from './module/traceability.module';
import { InputOperationModule } from './module/inputOperation.module';
import { InputMovementModule } from './module/inputMovement.module';

@Module({
  imports: 
    [
      ConfigModule.forRoot(), 
      GrowerModule, 
      FarmModule, 
      AuthModule, 
      UsersModule, 
      BreedModule, 
      SisbovModule,
      AnimalModule,
      AnimalAgeGroupModule,
      IdeModule,
      TraceabilityModule,
      IdvModule,
      InputOperationModule,
      AddressModule,
      InputMovementModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
