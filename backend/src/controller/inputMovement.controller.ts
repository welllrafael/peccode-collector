import { CollectionPecCode } from '../model/collection.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { InputMovementService } from '../service/inputMovement.service';
import { InputMovementGenericDTO } from 'src/dto/InputMovementGeneric.dto';

@Controller("/api/v1/movement")
export class InputMovementController {
  constructor(private readonly inputMovementService: InputMovementService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get("/id/:type/:id")
  async getById(@Param("id") id: string, @Param("type") type: string): Promise<string> {
    return await this.inputMovementService.getById(id, type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all/:type")
  async getAll(@Param("type") type: string): Promise<string> {
    return await this.inputMovementService.getAll(type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/struct/:type")
  getStruct(@Param("type") type: string): CollectionPecCode {
    return this.inputMovementService.getStruct(type);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":type")
  async postMovement(@Body() postMovementDTO: InputMovementGenericDTO, @Param("type") type: string): Promise<string> {
    return await this.inputMovementService.create(postMovementDTO,type);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":type")
  async putMovement(@Body() putMovementDTO: InputMovementGenericDTO, @Param("type") type: string): Promise<string> {
    return await this.inputMovementService.update(putMovementDTO, type);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":type")
  async deleteMovement(@Body() deleteMovementDTO: InputMovementGenericDTO, @Param("type") type: string): Promise<string> {
    return await this.inputMovementService.delete(deleteMovementDTO, type);
  }
}
