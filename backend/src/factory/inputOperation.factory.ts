import { InputOperationAnimalRepository } from '../repositories/inputOperationAnimal.repository';
import { InputOperationProtocolMedicineRepository } from '../repositories/InputOperationProtocolMedicine.repository';
import { InputOperationHealthProtocolRepository } from '../repositories/InputOperationHealthProtocol.repository';
import { InputOperationTraceabilityRepository } from '../repositories/InputOperationTraceability.repository';
import { InputOperationRepository } from '../repositories/inputOperation.repository';
import { SelectInputOperationRepository } from '../repositories/pecCode.enum';
import { IRepository } from '../repositories/IRepository.interface';
import { Injectable } from '@nestjs/common';
import { GenericFactory } from './generic.factory';

@Injectable()
export class InputOperationFactory extends GenericFactory<IRepository> {

    create(type: string): IRepository {
        let inputOperationType = parseInt(type);

        switch (inputOperationType) {
            case SelectInputOperationRepository.InputOperation:
                return new InputOperationRepository();
            case SelectInputOperationRepository.InputOperationAnimal:                
                return new InputOperationAnimalRepository();
            case SelectInputOperationRepository.InputOperationTraceability:     
                return new InputOperationTraceabilityRepository();           
            case SelectInputOperationRepository.InputOperationHealthProtocol:                
                return new InputOperationHealthProtocolRepository();
            case SelectInputOperationRepository.InputOperationProtocolMedicine:     
                return new InputOperationProtocolMedicineRepository();                           
        }
    }

}
