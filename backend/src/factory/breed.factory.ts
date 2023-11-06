import { IViewRepository } from '../repositories/IViewRepository.interface';
import { CharacteristicEnumRepository } from '../repositories/characteristicEnum.repository';
import { CharacteristicRepository } from '../repositories/characteristic.repository';
import { BreedRepository } from '../repositories/breed.repository';
import { SelectBreedRepository } from '../repositories/pecCode.enum';
import { Injectable } from '@nestjs/common';
import { GenericFactory } from './generic.factory';

@Injectable()
export class BreedFactory extends GenericFactory<IViewRepository> {

    create(type: string): IViewRepository {
        let breedType = parseInt(type);

        switch (breedType) {
            case SelectBreedRepository.Breed:
                return new BreedRepository();
            case SelectBreedRepository.Characteristic:                
                return new CharacteristicRepository();
            case SelectBreedRepository.CharacteristicEnum:                
                return new CharacteristicEnumRepository();                
        }        
    }
}
