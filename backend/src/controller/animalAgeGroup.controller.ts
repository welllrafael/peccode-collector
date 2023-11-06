import { CollectionPecCode } from './../model/collection.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnimalAgeGroupService } from '../service/animalAgeGroup.service';

@Controller("/api/v1/animalAgeGroup")
export class AnimalAgeGroupController {
  constructor(private readonly animalAgeGroupService: AnimalAgeGroupService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/id/:animalAgeGroupId")
  async getById(@Param("animalAgeGroupId") animalAgeGroupId: string): Promise<string> {
    return await this.animalAgeGroupService.getById(animalAgeGroupId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  async getAll(): Promise<string> {
    return await this.animalAgeGroupService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/struct")
  getStruct(): CollectionPecCode {
    return this.animalAgeGroupService.getStruct();
  }
}
