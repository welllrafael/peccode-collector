import { IAreaRepository } from './../repository/IAreaRepository.interface';
import { Injectable } from '@nestjs/common';
import { AreaRepository } from 'src/repository/area.repository';
import { GenericFactory } from './generic.factory';

@Injectable()
export class AreaFactory extends GenericFactory<IAreaRepository> {

    create(value: object): AreaRepository {
        return new AreaRepository();
    }

}
