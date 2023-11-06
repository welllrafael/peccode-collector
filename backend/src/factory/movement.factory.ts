import { OutputMovementRepository } from '../repositories/outputMovement.repository';
import { InternalMovementRepository } from '../repositories/internalMovement.repository';
import { MovementTypeRepository } from '../repositories/movementType.repository';
import { InputMovementRepository } from '../repositories/inputMovement.repository';
import { SelectInputMovementRepository } from '../repositories/pecCode.enum';
import { IViewRepository } from '../repositories/IViewRepository.interface';
import { Injectable } from '@nestjs/common';
import { GenericFactory } from './generic.factory';
import { IRepository } from 'src/repositories/IRepository.interface';

@Injectable()
export class InputMovementFactory extends GenericFactory<IViewRepository> {

    create(type: string): IRepository {
        let movementType = parseInt(type);

        switch (movementType) {
            case SelectInputMovementRepository.InputMovement:                
                return new InputMovementRepository()                
            case SelectInputMovementRepository.MovementType:
                return new MovementTypeRepository();                
            case SelectInputMovementRepository.InternalMovement:                
                return new InternalMovementRepository();                
            case SelectInputMovementRepository.OutputMovement:                
                return new OutputMovementRepository();                
        }        
    }
}
