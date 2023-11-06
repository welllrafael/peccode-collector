import { AddressService } from '../service/address.service';
import { AddressController } from '../controller/address.controller';
/* istanbul ignore file */
import { Module } from '@nestjs/common';

@Module({
  providers: [AddressService],
  controllers: [AddressController]
})
export class AddressModule {}
