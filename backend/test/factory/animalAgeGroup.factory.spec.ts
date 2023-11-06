import { AnimalAgeGroupFactory } from '../../src/factory/animalAgeGroup.factory';
import { AnimalAgeGroupRepository } from '../../src/repositories/animalAgeGroup.repository';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('AnimalAgeGroup Factory', () => {

    let app: INestApplication;
    let animalAgeGroupFactory: AnimalAgeGroupFactory;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AnimalAgeGroupFactory],                        
        }).compile();

        animalAgeGroupFactory = await module.get<AnimalAgeGroupFactory>(AnimalAgeGroupFactory);        

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing AnimalAgeGroup Factory', () => {         

        it('Should be validate the animalAgeGroup type and return AnimalAgeGroupRepository', async () => {            
            const instance = animalAgeGroupFactory.create();

            expect(instance.constructor.name).toEqual(AnimalAgeGroupRepository.name);
        }); 
    });
});