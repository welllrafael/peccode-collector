import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BreedRepository } from '../../src/repositories/breed.repository';
import { CharacteristicRepository } from '../../src/repositories/characteristic.repository';
import { CharacteristicEnumRepository } from '../../src/repositories/characteristicEnum.repository';
import { BreedFactory } from '../../src/factory/breed.factory';

describe('Breed Factory', () => {

    let app: INestApplication;
    let breedFactory: BreedFactory;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BreedFactory],                        
        }).compile();

        breedFactory = await module.get<BreedFactory>(BreedFactory);        

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing Breed Factory', () => {
        
        it('Should be validate the breed type doesnt exist', async () => {
            const breedRepository: string = "A";

            await expect(breedFactory.create(breedRepository)).toBe(undefined);                          
        }); 

        it('Should be validate the breed type and return BreedRepository', async () => {
            const breedRepository: string = "0";
            const instance = breedFactory.create(breedRepository);

            expect(instance.constructor.name).toEqual(BreedRepository.name);
        }); 

        it('Should be validate the characteristic repository and return CharacteristicRepository', async () => {
            const characteristicRepository: string = "1";
            const instance = breedFactory.create(characteristicRepository);

            expect(instance.constructor.name).toEqual(CharacteristicRepository.name);
        }); 

        it('Should be validate the characteristic enum repository and return CharacteristicEnumRepository', async () => {
            const characteristicEnumRepository: string = "2";
            const instance = breedFactory.create(characteristicEnumRepository);

            expect(instance.constructor.name).toEqual(CharacteristicEnumRepository.name);
        });  
    });
});