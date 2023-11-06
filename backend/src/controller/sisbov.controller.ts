import { CollectionPecCode } from './../model/collection.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SisbovService } from '../service/sisbov.service';

@Controller("/api/v1/sisbov")
export class SisbovController {
  constructor(private readonly sisbovService: SisbovService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/id/:type/:id")
  async getById(@Param("id") id: string, @Param("type") type: string): Promise<string> {
    return await this.sisbovService.getById(id, type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all/:type")
  async getAll(@Param("type") type: string): Promise<string> {
    return await this.sisbovService.getAll(type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/struct/:type")
  getStruct(@Param("type") type: string): CollectionPecCode {
    return this.sisbovService.getStruct(type);
  }
}
