import { Injectable } from '@nestjs/common';
import { IRepository } from '../repositories/IRepository.interface';
import { TraceabilityRepository } from '../repositories/traceability.repository';
import { GenericFactory } from './generic.factory';

@Injectable()
export class TraceabilityFactory extends GenericFactory<IRepository> {

    create(): IRepository {
        return new TraceabilityRepository();
    }

}
