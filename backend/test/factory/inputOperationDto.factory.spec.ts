import { DeleteInputOperationHealthProtocolDTO, PostInputOperationHealthProtocolDTO, PutInputOperationHealthProtocolDTO } from '../../src/dto/inputOperationHealthProtocol.dto';
import { DeleteInputOperationTraceabilityDTO, PostInputOperationTraceabilityDTO, PutInputOperationTraceabilityDTO } from '../../src/dto/inputOperationTraceability.dto';
import { DeleteInputOperationAnimalDTO, PostInputOperationAnimalDTO, PutInputOperationAnimalDTO } from '../../src/dto/inputOperationAnimal.dto';
import { DeleteInputOperationDTO, PostInputOperationDTO, PutInputOperationDTO } from './../../src/dto/inputOperation.dto';
import { InputOperationFactoryDto, verbs } from './../../src/factory/inputOperationDto.factory';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteInputOperationProtocolMedicineDTO, PostInputOperationProtocolMedicineDTO, PutInputOperationProtocolMedicineDTO } from '../../src/dto/inputOperationProtocolMedicine.dto';

describe('Dto Factory', () => {

    let app: INestApplication;
    let inputOperationFactoryDto: InputOperationFactoryDto;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [InputOperationFactoryDto],                        
        }).compile(); 

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing Input Operation Factory', () => {
        
        it('Should be validate the input operation type and return PostInputOperationDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationRepository", verbs.post)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(PostInputOperationDTO);
        }); 

        it('Should be validate the input operation type and return PutInputOperationDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationRepository", verbs.put)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(PutInputOperationDTO);
        }); 

        it('Should be validate the input operation type and return DeleteInputOperationDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationRepository", verbs.del)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(DeleteInputOperationDTO);
        }); 

        it('Should be validate the input operation type and return PostInputOperationAnimalDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationAnimalRepository", verbs.post)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(PostInputOperationAnimalDTO);
        }); 

        it('Should be validate the input operation type and return PutInputOperationAnimalDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationAnimalRepository", verbs.put)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(PutInputOperationAnimalDTO);
        }); 

        it('Should be validate the input operation type and return DeleteInputOperationAnimalDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationAnimalRepository", verbs.del)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(DeleteInputOperationAnimalDTO);
        }); 

        it('Should be validate the input operation type and return PostInputOperationTraceabilityDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationTraceabilityRepository", verbs.post)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(PostInputOperationTraceabilityDTO);
        }); 

        it('Should be validate the input operation type and return PutInputOperationTraceabilityDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationTraceabilityRepository", verbs.put)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(PutInputOperationTraceabilityDTO);
        }); 

        it('Should be validate the input operation type and return DeleteInputOperationTraceabilityDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationTraceabilityRepository", verbs.del)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(DeleteInputOperationTraceabilityDTO);        
        });

        it('Should be validate the input operation type and return PostInputOperationHealthProtocolDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationHealthProtocolRepository", verbs.post)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(PostInputOperationHealthProtocolDTO);
        });

        it('Should be validate the input operation type and return PutInputOperationHealthProtocolDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationHealthProtocolRepository", verbs.put)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(PutInputOperationHealthProtocolDTO);
        });

        it('Should be validate the input operation type and return DeleteInputOperationHealthProtocolDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationHealthProtocolRepository", verbs.del)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(DeleteInputOperationHealthProtocolDTO);        
        });

        it('Should be validate the input operation type and return PostInputOperationProtocolMedicineDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationProtocolMedicineRepository", verbs.post)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(PostInputOperationProtocolMedicineDTO);
        });

        it('Should be validate the input operation type and return PutInputOperationProtocolMedicineDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationProtocolMedicineRepository", verbs.put)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(PutInputOperationProtocolMedicineDTO);
        });

        it('Should be validate the input operation type and return DeleteInputOperationProtocolMedicineDTO', async () => {
            inputOperationFactoryDto = new InputOperationFactoryDto("InputOperationProtocolMedicineRepository", verbs.del)
            const instance = inputOperationFactoryDto.getDto();

            expect(instance).toEqual(DeleteInputOperationProtocolMedicineDTO);        
        });        
    });
});