import { CollectionPecCode } from './../model/collection.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BreedService } from '../service/breed.service';

@Controller("/api/v1/breed")
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/id/:type/:id")
  async getById(@Param("id") id: string, @Param("type") type: string): Promise<string> {
    return await this.breedService.getById(id, type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all/:type")
  async getAll(@Param("type") type: string): Promise<string> {
    return await this.breedService.getAll(type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/struct/:type")
  getStruct(@Param("type") type: string): CollectionPecCode {
    return this.breedService.getStruct(type);
  }
}
