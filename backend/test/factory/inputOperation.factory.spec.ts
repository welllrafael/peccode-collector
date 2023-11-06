import { InputOperationHealthProtocolRepository } from './../../src/repositories/InputOperationHealthProtocol.repository';
import { InputOperationTraceabilityRepository } from './../../src/repositories/InputOperationTraceability.repository';
import { InputOperationAnimalRepository } from './../../src/repositories/inputOperationAnimal.repository';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { InputOperationFactory } from '../../src/factory/inputOperation.factory';
import { InputOperationRepository } from '../../src/repositories/inputOperation.repository';
import { InputOperationProtocolMedicineRepository } from '../../src/repositories/InputOperationProtocolMedicine.repository';

describe('Input Operation Factory', () => {

    let app: INestApplication;
    let inputOperationFactory: InputOperationFactory;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [InputOperationFactory],                        
        }).compile();

        inputOperationFactory = await module.get<InputOperationFactory>(InputOperationFactory);        

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing Input Operation Factory', () => {
        
        it('Should be validate the input operation type doesnt exist', async () => {
            const inputOperationRepository: string = "A";

            await expect(inputOperationFactory.create(inputOperationRepository)).toBe(undefined);                          
        }); 

        it('Should be validate the input operation type and return inputOperationRepository', async () => {
            const inputOperationRepository: string = "0";
            const instance = inputOperationFactory.create(inputOperationRepository);

            expect(instance.constructor.name).toEqual(InputOperationRepository.name);
        }); 

        it('Should be validate the input operation type and return InputOperationAnimalRepository', async () => {
            const inputOperationRepository: string = "1";
            const instance = inputOperationFactory.create(inputOperationRepository);

            expect(instance.constructor.name).toEqual(InputOperationAnimalRepository.name);
        }); 

        it('Should be validate the input operation type and return InputOperationTraceabilityRepository', async () => {
            const inputOperationRepository: string = "2";
            const instance = inputOperationFactory.create(inputOperationRepository);

            expect(instance.constructor.name).toEqual(InputOperationTraceabilityRepository.name);
        });  

        it('Should be validate the input operation type and return InputOperationHealthProtocolRepository', async () => {
            const inputOperationRepository: string = "3";
            const instance = inputOperationFactory.create(inputOperationRepository);

            expect(instance.constructor.name).toEqual(InputOperationHealthProtocolRepository.name);
        });  
        
        it('Should be validate the input operation type and return InputOperationProtocolMedicineRepository', async () => {
            const inputOperationRepository: string = "4";
            const instance = inputOperationFactory.create(inputOperationRepository);

            expect(instance.constructor.name).toEqual(InputOperationProtocolMedicineRepository.name);
        });          
    });
});