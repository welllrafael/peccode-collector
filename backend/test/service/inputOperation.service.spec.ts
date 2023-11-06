import { DeleteInputOperationDTO, PostInputOperationDTO, PutInputOperationDTO } from './../../src/dto/inputOperation.dto';
import { InputOperationRepository } from './../../src/repositories/inputOperation.repository';
import { InputOperationService } from './../../src/service/inputOperation.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BSON } from 'realm';

describe('InputOperation Service', () => {

    let app: INestApplication;
    let inputOperationService: InputOperationService;     
    let inputOperationRepository: InputOperationRepository;

    const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");

    const traceFake: PostInputOperationDTO =
    {        
        id: idFake,	
        farmId: 1,
        animalInputMovementId: 1,
        farmGrowerId: 1,
        quantity: 1,
        obs: 'teste input operation',
        operationStatus: 'ativo',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        deletedAt: new Date(Date.now()),
    };
    
    const putTraceFake: PutInputOperationDTO =
    {
        id: idFake,	
        farmId: 1,
        animalInputMovementId: 1,
        farmGrowerId: 1,
        quantity: 1,
        obs: 'teste input operation',
        operationStatus: 'ativo',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        deletedAt: new Date(Date.now()),
    };
    
    const deleteTraceFake: DeleteInputOperationDTO =
    {
        id: idFake
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [InputOperationService, InputOperationRepository],                        
        }).compile();

        inputOperationRepository = await module.get<InputOperationRepository>(InputOperationRepository);
        inputOperationService = await module.get(InputOperationService);

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing fields Input Operation service', () => {

        it('Should be validate validateDto method', async () => {     
            const setVerb: number = 0;
            const setRepository: string = "InputOperationRepository";
            const result: any = undefined;            

            expect(await inputOperationService.validateDto(traceFake, setRepository, setVerb)).toBe(result);                
        });

        it('Should be validate create', async () => {     
            const setRepository: string = "0";

            jest.spyOn(inputOperationService, 'postData').mockResolvedValue(Promise.resolve(traceFake.id.toHexString()));

            expect(await inputOperationService.create(traceFake, setRepository)).toBe(traceFake.id.toHexString());                
        });

        it('Should be validate put', async () => {     
            const setRepository: string = "0";

            jest.spyOn(inputOperationService, 'putData').mockResolvedValue(Promise.resolve(putTraceFake.id.toHexString()));

            expect(await inputOperationService.update(putTraceFake, setRepository)).toBe(putTraceFake.id.toHexString());                
        });

        it('Should be validate delete', async () => {     
            let messageDelete: string = "message: registro deletado com sucesso.";
            const setRepository: string = "0";

            jest.spyOn(inputOperationService, 'deleteData').mockResolvedValue(Promise.resolve(messageDelete));

            expect(await inputOperationService.delete(deleteTraceFake, setRepository)).toBe("message: registro deletado com sucesso.");                
        });

        it('Should be validate the required fields in getById', async () => {
            let id: undefined;
            let setRepository: undefined;

            jest.spyOn(inputOperationRepository, 'getById').mockResolvedValue(id);

            await expect(inputOperationService.getById(id, setRepository))
            .rejects.toThrow("Field id is required.");                
        });

        it('Should be validate the required fields in getAll data', async () => {
            let setRepository: undefined;

            jest.spyOn(inputOperationRepository, 'getAll').mockResolvedValue(setRepository);

            await expect(inputOperationService.getAll(setRepository))
            .rejects.toThrow("Field typeInputOperation is required.");                
        });

        it('Should be a number in setRepository', async () => {
            let id: string = "000001";
            let setRepository: string = "A";

            jest.spyOn(inputOperationRepository, 'getById').mockResolvedValue(id);

            expect(inputOperationService.getById(id, setRepository))
            .rejects.toThrow("Field typeInputOperation is required and must be a number.");                
        });                

        it('Should be validate a inputOperationType out of range in getById', async () => {
            let id: string = "000001";
            let setRepository: string = "99";

            jest.spyOn(inputOperationRepository, 'getById').mockResolvedValue(id);

            expect(inputOperationService.getById(id, setRepository))
            .rejects.toThrow("Type out of range.");                
        });                

        it('Should be validate a inputOperationType out of range in getAll', async () => {            
            let setRepository: string = "99";

            expect(inputOperationService.getAll(setRepository))
            .rejects.toThrow("Type out of range.");                
        });                

        it('Should be work!', async () => {
            const id: string = "000001";
            const setRepository: string = "0";
            
            jest.spyOn(inputOperationService, "getData").mockImplementation(() => Promise.resolve(id));       

            expect(await inputOperationService.getById(id, setRepository)).toBe("000001");
        });

        it('Should be work getAll!', async () => {         
            const setRepository: string = "0";

            jest.spyOn(inputOperationService, "getAllData").mockImplementation(() => Promise.resolve(""));       

            expect(await inputOperationService.getAll(setRepository)).toBe("");
        });        
    });
});