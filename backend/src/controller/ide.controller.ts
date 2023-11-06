import { CollectionPecCode } from './../model/collection.model';
import { DeleteIdeDTO, PostIdeDTO, PutIdeDTO } from '../dto/ide.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IdeService } from '../service/ide.service';
import { ObjectSchema } from 'realm';

@Controller("/api/v1/ide")
export class IdeController {
  constructor(private readonly ideService: IdeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postIde(@Body() postIdeDTO: PostIdeDTO): Promise<string> {
    return await this.ideService.create(postIdeDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async putIde(@Body() putIdeDTO: PutIdeDTO): Promise<string> {
    return await this.ideService.update(putIdeDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteIde(@Body() deleteIdeDTO: DeleteIdeDTO): Promise<string> {
    return await this.ideService.delete(deleteIdeDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/id/:ideId")
  async getById(@Param("ideId") ideId: string): Promise<string> {
    return await this.ideService.getById(ideId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  async getAll(): Promise<string> {
    return await this.ideService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/struct")
  getStruct(): CollectionPecCode {
    return this.ideService.getStruct();
  }

}
