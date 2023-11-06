import { PostInputMovementDTO, PutInputMovementDTO, DeleteInputMovementDTO } from './../dto/inputMovement.dto';
import { verbs } from './generic.factory';
import { Type } from '@nestjs/common';
import { InputMovementRepository } from 'src/repositories/inputMovement.repository';
import { OutputMovementRepository } from 'src/repositories/outputMovement.repository';
import { DeleteOutputMovementDTO, PostOutputMovementDTO, PutOutputMovementDTO } from 'src/dto/outputMovement.dto';
import { InternalMovementRepository } from 'src/repositories/internalMovement.repository';
import { DeleteInternalMovementDTO, PostInternalMovementDTO, PutInternalMovementDTO } from 'src/dto/internalMovement.dto';
import { MovementTypeRepository } from 'src/repositories/movementType.repository';
import { DeleteMovementTypeDTO, PostMovementTypeDTO, PutMovementTypeDTO } from 'src/dto/movementType.dto';

export class MovementFactoryDto {
    nameDto: string;
    verb: Number;

    constructor(_nameDto: string, _verb: Number){
        this.nameDto = _nameDto;
        this.verb = _verb;
    }

    getDto(): Type {

        switch (this.nameDto) {
            case InputMovementRepository.name :
                return (this.verb == verbs.post ? PostInputMovementDTO : 
                        this.verb == verbs.put ? PutInputMovementDTO : 
                        DeleteInputMovementDTO)
            case OutputMovementRepository.name :
                return (this.verb == verbs.post ? PostOutputMovementDTO : 
                    this.verb == verbs.put ? PutOutputMovementDTO : 
                    DeleteOutputMovementDTO)
            case InternalMovementRepository.name :
                return (this.verb == verbs.post ? PostInternalMovementDTO : 
                    this.verb == verbs.put ? PutInternalMovementDTO : 
                    DeleteInternalMovementDTO)
            case MovementTypeRepository.name :
                return (this.verb == verbs.post ? PostMovementTypeDTO : 
                    this.verb == verbs.put ? PutMovementTypeDTO : 
                    DeleteMovementTypeDTO)
        }
    }
}
