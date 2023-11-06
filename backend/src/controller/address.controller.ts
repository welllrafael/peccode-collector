import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AddressService } from '../service/address.service';
import { CollectionPecCode } from 'src/model/collection.model';

@Controller("/api/v1/address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get("/id/:type/:id")
  async getAddressById(@Param("type") type: string, @Param("id") id: string): Promise<string> {
    return await this.addressService.getAddressById(type,id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all/:type")
  async getAll(@Param("type") type: string): Promise<string> {
    return await this.addressService.getAll(type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/struct/:type")
  getAddressStruct(@Param("type") type: string): CollectionPecCode {
    return this.addressService.getStruct(type);
  }
}
