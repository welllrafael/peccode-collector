import { DeleteInputOperationProtocolMedicineDTO, PostInputOperationProtocolMedicineDTO, PutInputOperationProtocolMedicineDTO } from '../dto/inputOperationProtocolMedicine.dto';
import { DeleteInputOperationHealthProtocolDTO, PostInputOperationHealthProtocolDTO, PutInputOperationHealthProtocolDTO } from './../dto/inputOperationHealthProtocol.dto';
import { DeleteInputOperationTraceabilityDTO, PostInputOperationTraceabilityDTO, PutInputOperationTraceabilityDTO } from './../dto/inputOperationTraceability.dto';
import { DeleteInputOperationAnimalDTO, PostInputOperationAnimalDTO, PutInputOperationAnimalDTO } from './../dto/inputOperationAnimal.dto';
import { DeleteInputOperationDTO, PostInputOperationDTO, PutInputOperationDTO } from './../dto/inputOperation.dto';
import { InputOperationProtocolMedicineRepository } from '../repositories/InputOperationProtocolMedicine.repository';
import { InputOperationHealthProtocolRepository } from '../repositories/InputOperationHealthProtocol.repository';
import { InputOperationTraceabilityRepository } from '../repositories/InputOperationTraceability.repository';
import { InputOperationAnimalRepository } from '../repositories/inputOperationAnimal.repository';
import { InputOperationRepository } from '../repositories/inputOperation.repository';
import { Type } from '@nestjs/common';

export class InputOperationFactoryDto {
    nameDto: string;
    verb: Number;

    constructor(_nameDto: string, _verb: Number){
        this.nameDto = _nameDto;
        this.verb = _verb;
    }

    getDto(): Type {

        switch (this.nameDto) {
            case InputOperationRepository.name :
                return (this.verb == verbs.post ? PostInputOperationDTO : 
                        this.verb == verbs.put ? PutInputOperationDTO : 
                        DeleteInputOperationDTO)
            case InputOperationAnimalRepository.name :
                return (this.verb == verbs.post ? PostInputOperationAnimalDTO : 
                    this.verb == verbs.put ? PutInputOperationAnimalDTO : 
                    DeleteInputOperationAnimalDTO)
            case InputOperationTraceabilityRepository.name :
                return (this.verb == verbs.post ? PostInputOperationTraceabilityDTO : 
                    this.verb == verbs.put ? PutInputOperationTraceabilityDTO : 
                    DeleteInputOperationTraceabilityDTO)
            case InputOperationHealthProtocolRepository.name :
                return (this.verb == verbs.post ? PostInputOperationHealthProtocolDTO : 
                    this.verb == verbs.put ? PutInputOperationHealthProtocolDTO : 
                    DeleteInputOperationHealthProtocolDTO)
            case InputOperationProtocolMedicineRepository.name:     
                return (this.verb == verbs.post ? PostInputOperationProtocolMedicineDTO : 
                    this.verb == verbs.put ? PutInputOperationProtocolMedicineDTO : 
                    DeleteInputOperationProtocolMedicineDTO)                
        }
    }
}

export enum verbs {
    post,
    put,
    del
}
