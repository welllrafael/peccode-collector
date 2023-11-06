import { Injectable } from '@nestjs/common';
import { IdeRepository } from '../repositories/ide.repository';
import { GenericFactory } from './generic.factory';
import { IRepository } from '../repositories/IRepository.interface';

@Injectable()
export class IdeFactory extends GenericFactory<IRepository> {

    create(): IRepository {
        return new IdeRepository();
    }

}
