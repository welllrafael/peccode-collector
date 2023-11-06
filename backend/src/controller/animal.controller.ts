import { AnimalGenericDTO } from '../dto/AnimalGeneric.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AnimalService } from '../service/animal.service';
import { CollectionPecCode } from 'src/model/collection.model';

@Controller("/api/v1/animal")
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @UseGuards(JwtAuthGuard)
  @Post(":type")
  async postAnimal(@Body() postAnimalDTO: AnimalGenericDTO, @Param("type") type: string): Promise<string> {
    return await this.animalService.create(postAnimalDTO,type);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":type")
  async putAnimal(@Body() putAnimalDTO: AnimalGenericDTO, @Param("type") type: string): Promise<string> {
    return await this.animalService.update(putAnimalDTO, type);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":type")
  async deleteAnimal(@Body() deleteAnimalDTO: AnimalGenericDTO, @Param("type") type: string): Promise<string> {
    return await this.animalService.delete(deleteAnimalDTO, type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/id/:type/:id")
  public async getById(@Param("id") id: string, @Param("type") type: string): Promise<string> {
    return await this.animalService.getById(id, type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all/:type")
  public async getAll(@Param("type") type: string): Promise<string> {
    return await this.animalService.getAll(type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/struct/:type")
  public getStruct(@Param("type") type: string): CollectionPecCode {
    return this.animalService.getStruct(type);
  }
}
