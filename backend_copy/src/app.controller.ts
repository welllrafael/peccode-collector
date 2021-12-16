import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/api/realmdb")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllTasks(): Promise<string> {
    return await this.appService.getTasks();
  }

  @Post()
  async sendAllTasks(): Promise<string> {
    return await this.appService.sendTasks();
  }

  @Put()
  async updateAllTasks(): Promise<string> {
    return await this.appService.updateTask();
  }

  @Delete()
  async deleteAllTasks(): Promise<string> {
    return await this.appService.deleteTask();
  }
}
