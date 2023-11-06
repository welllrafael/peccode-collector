import { CollectionPecCode } from './../model/collection.model';
import { InputOperationGenericDTO } from '../dto/InputOperationGeneric.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { InputOperationService } from '../service/inputOperation.service';

@Controller("/api/v1/inputOperation")
export class InputOperationController {
  constructor(private readonly inputOperationService: InputOperationService) {}

  @UseGuards(JwtAuthGuard)
  @Post(":type")
  async postInputOperation(@Body() postInputOperationDTO: InputOperationGenericDTO, @Param("type") type: string): Promise<string> {
    return await this.inputOperationService.create(postInputOperationDTO,type);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":type")
  async putInputOperation(@Body() putInputOperationDTO: InputOperationGenericDTO, @Param("type") type: string): Promise<string> {
    return await this.inputOperationService.update(putInputOperationDTO, type);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":type")
  async deleteInputOperation(@Body() deleteInputOperationDTO: InputOperationGenericDTO, @Param("type") type: string): Promise<string> {
    return await this.inputOperationService.delete(deleteInputOperationDTO, type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/id/:type/:id")
  public async getById(@Param("id") id: string, @Param("type") type: string): Promise<string> {
    return await this.inputOperationService.getById(id, type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all/:type")
  public async getAll(@Param("type") type: string): Promise<string> {
    return await this.inputOperationService.getAll(type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/struct/:type")
  public getStruct(@Param("type") type: string): CollectionPecCode {
    return this.inputOperationService.getStruct(type);
  }
}
