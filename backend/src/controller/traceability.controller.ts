import { CollectionPecCode } from './../model/collection.model';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { TraceabilityService } from '../service/traceability.service';
import { DeleteTraceabilityDTO, PostTraceabilityDTO, PutTraceabilityDTO } from '../dto/traceability.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller("/api/v1/traceability")
export class TraceabilityController {
  constructor(private readonly traceabilityService: TraceabilityService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postTraceability(@Body() postTraceabilityDTO: PostTraceabilityDTO): Promise<string> {
    return await this.traceabilityService.create(postTraceabilityDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async putTraceability(@Body() putTraceabilityDTO: PutTraceabilityDTO): Promise<string> {
    return await this.traceabilityService.update(putTraceabilityDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteTraceability(@Body() deleteTraceabilityDTO: DeleteTraceabilityDTO): Promise<string> {
    return await this.traceabilityService.delete(deleteTraceabilityDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/id/:traceabilityId")
  async getById(@Param("traceabilityId") traceabilityId: string): Promise<string> {
    return await this.traceabilityService.getById(traceabilityId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  async getAll(): Promise<string> {
    return await this.traceabilityService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/struct")
  getStruct(): CollectionPecCode {
    return this.traceabilityService.getStruct();
  }
}
