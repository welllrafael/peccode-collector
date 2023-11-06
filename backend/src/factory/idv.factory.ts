import { IRepository } from '../repositories/IRepository.interface';
import { Injectable } from '@nestjs/common';
import { IdvRepository } from '../repositories/idv.repository';
import { GenericFactory } from './generic.factory';

@Injectable()
export class IdvFactory extends GenericFactory<IRepository> {

    create(): IRepository {
        return new IdvRepository();
    }

}
