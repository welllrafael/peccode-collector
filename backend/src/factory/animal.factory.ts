import { SelectAnimalRepository } from '../repositories/pecCode.enum';
import { IRepository } from '../repositories/IRepository.interface';
import { Injectable } from '@nestjs/common';
import { AnimalRepository } from '../repositories/animal.repository';
import { AnimalCurrentDataRepository } from '../repositories/animalCurrentData.repository';
import { AnimalAgeGroupRepository } from '../repositories/animalAgeGroup.repository';
import { AnimalCharacteristicRepository } from '../repositories/animalCharacteristic.repository';
import { GenericFactory } from './generic.factory';

@Injectable()
export class AnimalFactory extends GenericFactory<IRepository> {

    create(type: string): IRepository {
        let animalType = parseInt(type);

        switch (animalType) {
            case SelectAnimalRepository.Animal:
                return new AnimalRepository();
            case SelectAnimalRepository.AnimalCharacteristic:                
                return new AnimalCharacteristicRepository();
            case SelectAnimalRepository.AnimalCurrentData:     
                return new AnimalCurrentDataRepository();           
                
        }
    }

}
