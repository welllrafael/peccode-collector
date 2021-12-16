import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AreaService } from '../service/area.service';

@Controller("/api/area")
export class AppController {
  constructor(private readonly appService: AreaService) {}

  @Get()
  async getAllTasks(): Promise<void> {
    return await this.appService.getTasks();
  }

  @Post()
  async sendAllTasks(): Promise<void> {
    return await this.appService.sendTasks();
  }

  @Put()
  async updateAllTasks(): Promise<void> {
    return await this.appService.updateTask();
  }

  @Delete()
  async deleteAllTasks(): Promise<void> {
    return await this.appService.deleteTask();
  }
}
