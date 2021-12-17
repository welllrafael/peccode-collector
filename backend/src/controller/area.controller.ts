import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AreaService } from '../service/area.service';

@Controller("/api/area")
export class AppController {
  constructor(private readonly appService: AreaService) {}

  @Get()
  async getAllTasks(): Promise<void> {
    return await this.appService.getArea();
  }

  @Post()
  async sendAllTasks(): Promise<void> {
    return await this.appService.postArea();
  }

  @Put()
  async updateAllTasks(): Promise<void> {
    return await this.appService.putArea();
  }

  @Delete()
  async deleteAllTasks(): Promise<void> {
    return await this.appService.deleteArea();
  }
}
