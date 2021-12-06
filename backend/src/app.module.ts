import { ConnectRealmDB } from './connect/connect.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ConnectRealmDB, Realm],
})
export class AppModule {}
