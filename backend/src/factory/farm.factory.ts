import { SelectFarmRepository } from '../repositories/pecCode.enum';
import { IViewRepository } from '../repositories/IViewRepository.interface';
import { FarmSectorRepository } from '../repositories/farmSector.repository';
import { FarmLotTypeRepository } from '../repositories/farmLotType.repository';
import { FarmAreaTypeRepository } from '../repositories/farmAreaType.repository';
import { FarmAreaRepository } from '../repositories/farmArea.repository';
import { Injectable } from '@nestjs/common';
import { FarmRepository } from '../repositories/farm.repository';
import { FarmLotRepository } from '../repositories/farmLot.repository';
import { GenericFactory } from './generic.factory';

@Injectable()
export class FarmFactory extends GenericFactory<IViewRepository> {

    create(type: string): IViewRepository {
        let farmType = parseInt(type);

        switch (farmType) {
            case SelectFarmRepository.Farm:
                return new FarmRepository();                
            case SelectFarmRepository.FarmArea:                
                return new FarmAreaRepository()                
            case SelectFarmRepository.FarmAreaType:                
                return new FarmAreaTypeRepository();                
            case SelectFarmRepository.FarmLotType:                
                return new FarmLotTypeRepository();                
            case SelectFarmRepository.FarmSector:
                return new FarmSectorRepository();                
            case SelectFarmRepository.FarmLot:
                return new FarmLotRepository();                
        }        
    }
}
