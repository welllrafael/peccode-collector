import { CollectionPecCode } from './../model/collection.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FarmService } from '../service/farm.service';

@Controller("/api/v1/farm")
export class FarmController {
  constructor(private readonly farmService: FarmService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get("/id/:type/:id")
  async getById(@Param("id") id: string, @Param("type") type: string): Promise<string> {
    return await this.farmService.getById(id, type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all/:type")
  async getAll(@Param("type") type: string): Promise<string> {
    return await this.farmService.getAll(type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/struct/:type")
  getStruct(@Param("type") type: string): CollectionPecCode {
    return this.farmService.getStruct(type);
  }
}
