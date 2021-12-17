import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AreaModule } from './module/area.module';

@Module({
  imports: [AreaModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
