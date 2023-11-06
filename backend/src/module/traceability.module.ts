/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TraceabilityController } from '../controller/traceability.controller';
import { TraceabilityService } from '../service/traceability.service';

@Module({
  providers: [TraceabilityService],
  controllers: [TraceabilityController]
})
export class TraceabilityModule {}
