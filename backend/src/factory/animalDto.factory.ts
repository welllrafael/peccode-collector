import { verbs } from './generic.factory';
import { AnimalCurrentDataRepository } from '../repositories/animalCurrentData.repository';
import { AnimalCharacteristicRepository } from '../repositories/animalCharacteristic.repository';
import { AnimalRepository } from '../repositories/animal.repository';
import { DeleteAnimalCurrentDataDTO, PostAnimalCurrentDataDTO, PutAnimalCurrentDataDTO } from '../dto/animalCurrentData.dto';
import { DeleteAnimalCharacteristicDTO, PostAnimalCharacteristicDTO, PutAnimalCharacteristicDTO } from '../dto/animalCharacteristic.dto';
import { Type } from '@nestjs/common';
import { PostAnimalDTO, PutAnimalDTO, DeleteAnimalDTO } from '../dto/animal.dto';

export class AnimalFactoryDto {
    nameDto: string;
    verb: Number;

    constructor(_nameDto: string, _verb: Number){
        this.nameDto = _nameDto;
        this.verb = _verb;
    }

    getDto(): Type {

        switch (this.nameDto) {
            case AnimalRepository.name :
                return (this.verb == verbs.post ? PostAnimalDTO : 
                        this.verb == verbs.put ? PutAnimalDTO : 
                        DeleteAnimalDTO)
            case AnimalCharacteristicRepository.name :
                return (this.verb == verbs.post ? PostAnimalCharacteristicDTO : 
                    this.verb == verbs.put ? PutAnimalCharacteristicDTO : 
                    DeleteAnimalCharacteristicDTO)
            case AnimalCurrentDataRepository.name :
                return (this.verb == verbs.post ? PostAnimalCurrentDataDTO : 
                    this.verb == verbs.put ? PutAnimalCurrentDataDTO : 
                    DeleteAnimalCurrentDataDTO)
        }
    }
}
