import { CountyRepository } from '../../src/repositories/county.repository';
import { StateRepository } from '../../src/repositories/state.repository';
import { RegionRepository } from '../../src/repositories/region.repository';
import { CountryRepository } from '../../src/repositories/country.repository';

import { AddressFactory } from '../../src/factory/address.factory';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AddressRepository } from '../../src/repositories/address.repository';

describe('Address Factory', () => {

    let app: INestApplication;
    let addressFactory: AddressFactory;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AddressFactory],                        
        }).compile();

        addressFactory = await module.get<AddressFactory>(AddressFactory);        

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing Address Factory', () => {
        
        it('Should be validate the address type doesnt exist', async () => {
            const addressRepository: string = "A";

            await expect(addressFactory.create(addressRepository)).toBe(undefined);                          
        }); 

        it('Should be validate the address type and return AddressRepository', async () => {
            const addressRepository: string = "0";
            const instance = addressFactory.create(addressRepository);

            expect(instance.constructor.name).toEqual(AddressRepository.name);
        }); 

        it('Should be validate the address type and return CountryRepository', async () => {
            const countryRepository: string = "1";
            const instance = addressFactory.create(countryRepository);

            expect(instance.constructor.name).toEqual(CountryRepository.name);
        }); 

        it('Should be validate the address type and return RegionRepository', async () => {
            const regionRepository: string = "2";
            const instance = addressFactory.create(regionRepository);

            expect(instance.constructor.name).toEqual(RegionRepository.name);
        }); 

        it('Should be validate the address type and return StateRepository', async () => {
            const stateRepository: string = "3";
            const instance = addressFactory.create(stateRepository);

            expect(instance.constructor.name).toEqual(StateRepository.name);
        }); 

        it('Should be validate the address type and return AddressSectorRepository', async () => {
            const countyRepository: string = "4";
            const instance = addressFactory.create(countyRepository);

            expect(instance.constructor.name).toEqual(CountyRepository.name);
        }); 
    });
});