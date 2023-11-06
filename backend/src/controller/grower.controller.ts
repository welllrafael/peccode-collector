import { CollectionPecCode } from './../model/collection.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GrowerService } from '../service/grower.service';

@Controller("/api/v1/grower")
export class GrowerController {
  constructor(private readonly growerService: GrowerService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/id/:growerId")
  async getById(@Param("growerId") growerId: string): Promise<string> {
    return await this.growerService.getById(growerId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  async getAll(): Promise<string> {
    return await this.growerService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/struct")
  getStruct(): CollectionPecCode {
    return this.growerService.getStruct();
  }
}
