import { DeleteAreaDTO, PostAreaDTO, PutAreaDTO } from './../DTO/area.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AreaService } from '../service/area.service';

@Controller("/api/area")
export class AreaController {
  constructor(private readonly appService: AreaService) {}

  @Get(":areaId")
  async getAreaById(@Param("areaId") areaID: string): Promise<string> {
    return await this.appService.getAreaById(areaID);
  }

  @Post()
  async postAreaById(@Body() postAreaDTO: PostAreaDTO): Promise<string> {
    return await this.appService.postAreaById(postAreaDTO);
  }

  @Put()
  async putAreaById(@Body() putAreaDTO: PutAreaDTO): Promise<string> {
    return await this.appService.putAreaById(putAreaDTO);
  }

  @Delete()
  async deleteAreaById(@Body() deleteAreaDTO: DeleteAreaDTO): Promise<string> {
    return await this.appService.deleteAreaById(deleteAreaDTO);
  }

  @Delete()
  async deleteAllArea(): Promise<string> {
    return await this.appService.deleteAllArea();
  }
}
