import { AnimalCurrentDataRepository } from '../../src/repositories/animalCurrentData.repository';
import { AnimalCharacteristicRepository } from '../../src/repositories/animalCharacteristic.repository';
import { AnimalAgeGroupRepository } from '../../src/repositories/animalAgeGroup.repository';
import { AnimalFactory } from '../../src/factory/animal.factory';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AnimalRepository } from '../../src/repositories/animal.repository';

describe('Animal Factory', () => {

    let app: INestApplication;
    let animalFactory: AnimalFactory;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AnimalFactory],                        
        }).compile();

        animalFactory = await module.get<AnimalFactory>(AnimalFactory);        

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing Animal Factory', () => {
        
        it('Should be validate the animal type doesnt exist', async () => {
            const animalRepository: string = "A";

            await expect(animalFactory.create(animalRepository)).toBe(undefined);                          
        }); 

        it('Should be validate the animal type and return AnimalRepository', async () => {
            const animalRepository: string = "0";
            const instance = animalFactory.create(animalRepository);

            expect(instance.constructor.name).toEqual(AnimalRepository.name);
        }); 

        it('Should be validate the animal type and return AnimalCharacteristic', async () => {
            const animalCharacteristicRepository: string = "1";
            const instance = animalFactory.create(animalCharacteristicRepository);

            expect(instance.constructor.name).toEqual(AnimalCharacteristicRepository.name);
        }); 

        it('Should be validate the animal type and return AnimalCurrentData', async () => {
            const animalCurrentDataTypeRepository: string = "2";
            const instance = animalFactory.create(animalCurrentDataTypeRepository);

            expect(instance.constructor.name).toEqual(AnimalCurrentDataRepository.name);
        });  
    });
});