import { AnimalAgeGroupRepository } from '../repositories/animalAgeGroup.repository';
import { IViewRepository } from '../repositories/IViewRepository.interface';
import { Injectable } from '@nestjs/common';
import { GenericFactory } from './generic.factory';

@Injectable()
export class AnimalAgeGroupFactory extends GenericFactory<IViewRepository> {

    create(): IViewRepository {
        return new AnimalAgeGroupRepository();
    }

}
