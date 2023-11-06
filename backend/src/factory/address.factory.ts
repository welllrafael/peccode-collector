import { StateRepository } from '../repositories/state.repository';
import { RegionRepository } from '../repositories/region.repository';
import { CountryRepository } from '../repositories/country.repository';
import { AddressRepository } from '../repositories/address.repository';
import { IAddressRepository, AddressSelectRepo } from '../repositories/IAddressRepository.interface';
import { Injectable } from '@nestjs/common';
import { GenericFactory } from './generic.factory';
import { CountyRepository } from '../repositories/county.repository';

@Injectable()
export class AddressFactory extends GenericFactory<IAddressRepository> {

    create(type): IAddressRepository {
        let farmType = parseInt(type);
        
        switch (farmType) {
            case AddressSelectRepo.Address:
                return new AddressRepository();
            case AddressSelectRepo.Country:                
                return new CountryRepository();
            case AddressSelectRepo.State:                
                return new StateRepository();
            case AddressSelectRepo.Region:                
                return new RegionRepository();
            case AddressSelectRepo.County:    
                return new CountyRepository();
        }        
    }

}
