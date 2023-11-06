import { SelectSisbovRepository } from '../repositories/pecCode.enum';
import { IViewRepository } from '../repositories/IViewRepository.interface';
import { Injectable } from '@nestjs/common';

import { GenericFactory } from './generic.factory';
import { SisbovRequestRepository } from '../repositories/sisbovRequest.repository';
import { SisbovNumberRepository } from '../repositories/sisbovNumber.repository';

@Injectable()
export class SisbovFactory extends GenericFactory<IViewRepository> {

    create(type: string): IViewRepository {
        let sisbovType = parseInt(type);

        switch (sisbovType) {
            case SelectSisbovRepository.SisbovNumber:
                return new SisbovNumberRepository();
            case SelectSisbovRepository.SisbovRequest:                
                return new SisbovRequestRepository();                
        }        
    }

}
