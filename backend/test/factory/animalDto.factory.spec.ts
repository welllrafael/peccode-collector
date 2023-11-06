import { PostAnimalCurrentDataDTO, PutAnimalCurrentDataDTO, DeleteAnimalCurrentDataDTO } from '../../src/dto/animalCurrentData.dto';
import { PostAnimalCharacteristicDTO, PutAnimalCharacteristicDTO, DeleteAnimalCharacteristicDTO } from '../../src/dto/animalCharacteristic.dto';
import { PostAnimalDTO, PutAnimalDTO, DeleteAnimalDTO } from '../../src/dto/animal.dto';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AnimalFactoryDto } from 'src/factory/animalDto.factory';
import { verbs } from 'src/factory/generic.factory';

describe('Dto Factory', () => {

    let app: INestApplication;
    let animalFactoryDto: AnimalFactoryDto;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AnimalFactoryDto],                        
        }).compile(); 

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing Animal Factory', () => {
        
        it('Should be validate the animal type and return PostAnimalDTO', async () => {
            animalFactoryDto = new AnimalFactoryDto("AnimalRepository", verbs.post)
            const instance = animalFactoryDto.getDto();

            expect(instance).toEqual(PostAnimalDTO);
        }); 

        it('Should be validate the animal type and return PutAnimalDTO', async () => {
            animalFactoryDto = new AnimalFactoryDto("AnimalRepository", verbs.put)
            const instance = animalFactoryDto.getDto();

            expect(instance).toEqual(PutAnimalDTO);
        }); 

        it('Should be validate the animal type and return DeleteAnimalDTO', async () => {
            animalFactoryDto = new AnimalFactoryDto("AnimalRepository", verbs.del)
            const instance = animalFactoryDto.getDto();

            expect(instance).toEqual(DeleteAnimalDTO);
        }); 

        it('Should be validate the animal type and return PostAnimalCharacteristicDTO', async () => {
            animalFactoryDto = new AnimalFactoryDto("AnimalCharacteristicRepository", verbs.post)
            const instance = animalFactoryDto.getDto();

            expect(instance).toEqual(PostAnimalCharacteristicDTO);
        }); 

        it('Should be validate the animal type and return PutAnimalCharacteristicDTO', async () => {
            animalFactoryDto = new AnimalFactoryDto("AnimalCharacteristicRepository", verbs.put)
            const instance = animalFactoryDto.getDto();

            expect(instance).toEqual(PutAnimalCharacteristicDTO);
        }); 

        it('Should be validate the animal type and return DeleteAnimalCharacteristicDTO', async () => {
            animalFactoryDto = new AnimalFactoryDto("AnimalCharacteristicRepository", verbs.del)
            const instance = animalFactoryDto.getDto();

            expect(instance).toEqual(DeleteAnimalCharacteristicDTO);
        }); 

        it('Should be validate the animal type and return PostAnimalCurrentDataDTO', async () => {
            animalFactoryDto = new AnimalFactoryDto("AnimalCurrentDataRepository", verbs.post)
            const instance = animalFactoryDto.getDto();

            expect(instance).toEqual(PostAnimalCurrentDataDTO);
        }); 

        it('Should be validate the animal type and return PutAnimalCurrentDataDTO', async () => {
            animalFactoryDto = new AnimalFactoryDto("AnimalCurrentDataRepository", verbs.put)
            const instance = animalFactoryDto.getDto();

            expect(instance).toEqual(PutAnimalCurrentDataDTO);
        }); 

        it('Should be validate the animal type and return DeleteAnimalCurrentDataDTO', async () => {
            animalFactoryDto = new AnimalFactoryDto("AnimalCurrentDataRepository", verbs.del)
            const instance = animalFactoryDto.getDto();

            expect(instance).toEqual(DeleteAnimalCurrentDataDTO);
        }); 

    });
});