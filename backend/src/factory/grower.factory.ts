import { IViewRepository } from '../repositories/IViewRepository.interface';
import { Injectable } from '@nestjs/common';
import { GrowerRepository } from '../repositories/grower.repository';
import { GenericFactory } from './generic.factory';

@Injectable()
export class GrowerFactory extends GenericFactory<IViewRepository> {

    create(): IViewRepository {
        return new GrowerRepository();
    }

}
