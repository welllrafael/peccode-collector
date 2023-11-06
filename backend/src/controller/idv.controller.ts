import { CollectionPecCode } from './../model/collection.model';
import { PostIdvDTO, PutIdvDTO, DeleteIdvDTO } from '../dto/idv.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IdvService } from '../service/idv.service';

@Controller("/api/v1/idv")
export class IdvController {
  constructor(private readonly idvService: IdvService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postIdv(@Body() postIdvDTO: PostIdvDTO): Promise<string> {
    return await this.idvService.create(postIdvDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async putIdv(@Body() putIdvDTO: PutIdvDTO): Promise<string> {
    return await this.idvService.update(putIdvDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteIdv(@Body() deleteIdvDTO: DeleteIdvDTO): Promise<string> {
    return await this.idvService.delete(deleteIdvDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/id/:idvId")
  async getById(@Param("idvId") idvId: string): Promise<string> {
    return await this.idvService.getById(idvId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  async getAll(): Promise<string> {
    return await this.idvService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/struct/:type")
  getStruct(): CollectionPecCode {
    return this.idvService.getStruct();
  }
}
