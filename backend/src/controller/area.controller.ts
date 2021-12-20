import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AreaService } from '../service/area.service';

@Controller("/api/area")
export class AreaController {
  constructor(private readonly appService: AreaService) {}

  @Get()
  async getAllArea(): Promise<string> {
    return await this.appService.getArea();
  }

  @Post()
  async postAllArea(): Promise<string> {
    return await this.appService.postArea();
  }

  @Put()
  async putAllArea(): Promise<string> {
    return await this.appService.putArea();
  }

  @Delete()
  async deleteAllArea(): Promise<string> {
    return await this.appService.deleteArea();
  }
}
