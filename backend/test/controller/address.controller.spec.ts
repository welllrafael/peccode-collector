import { AddressSchema } from '../../src/entities/address.entity';
import { Address } from '../../src/entities/address.entity';
import { AddressService } from '../../src/service/address.service';
import { AddressController } from '../../src/controller/address.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from "bson";
import { BSON } from 'realm';

const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");
const addressEntityList: Address = {
    _id: idFake,
    cep: 78144000,
    country: 1,
    county: 1,
    complement: "fake complement",
    description: "fake description",
    district: "fake district",
    number: 2,
    state: 1
};

describe('AddressController', () => {

    let addressController: AddressController;     
    let addressService: AddressService;  

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AddressController],
            providers: [{
                provide: AddressService,
                useValue: {
                    getAddressById: jest.fn().mockResolvedValue(JSON.stringify(addressEntityList)),
                    getStruct: jest.fn().mockResolvedValue(JSON.stringify(AddressSchema)),
                }
            }],
        }).compile();

        addressController = module.get<AddressController>(AddressController);
        addressService = module.get<AddressService>(AddressService);
    });

    it('Should be defined', () => {                    
        expect(addressController).toBeDefined();
        expect(addressService).toBeDefined();
    }); 

    it('should get a address item successfully', async () => {
        const typeRepo = "0";
        const id = "000001";
        const result = await addressController.getAddressById(typeRepo,id);
  
        expect(result).toEqual(JSON.stringify(addressEntityList));
        expect(addressService.getAddressById).toHaveBeenCalledTimes(1);
      });

      it('should get a address struct item successfully', async () => {
        const typeRepo = "0";
        const result = await addressController.getAddressStruct(typeRepo);
  
        expect(result).toEqual(JSON.stringify(AddressSchema));
        expect(addressService.getStruct).toHaveBeenCalledTimes(1);
      });

});