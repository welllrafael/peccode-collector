import { TraceabilityRepository } from '../../src/repositories/traceability.repository';
import { TraceabilityService } from '../../src/service/traceability.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostTraceabilityDTO, PutTraceabilityDTO, DeleteTraceabilityDTO } from '../../src/dto/traceability.dto';
import { ObjectId } from "bson";
import { BSON } from 'realm';

describe('Traceability Service', () => {

    let app: INestApplication;
    let traceabilityService: TraceabilityService;     
    let traceabilityRepository: TraceabilityRepository;

    const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");

    const traceFake: PostTraceabilityDTO =
        {
            sisbovNumber: 1,
            animalId: idFake,
            farmId: idFake,
            manejo: 1,
            sisbovDate: new Date(Date.now()),
            solNumber: 1,
            cotaHiltonDate: new Date(Date.now()),
            slaughterReleaseDate: new Date(Date.now()),
            status: true,
            obs: "dados fake" 
        };

    const putTraceFake: PutTraceabilityDTO =
        {
            id: idFake,
            sisbovNumber: 1,
            animalId: idFake,
            farmId: idFake,
            manejo: 1,
            sisbovDate: new Date(Date.now()),
            solNumber: 1,
            cotaHiltonDate: new Date(Date.now()),
            slaughterReleaseDate: new Date(Date.now()),
            status: true,
            obs: "dados fake" 
        };

    const deleteTraceFake: DeleteTraceabilityDTO =
        {
            id: idFake
        };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TraceabilityService, TraceabilityRepository],                        
        }).compile();

        traceabilityRepository = await module.get<TraceabilityRepository>(TraceabilityRepository);
        traceabilityService = await module.get(TraceabilityService);

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing fields Traceability service', () => {
        
        it('Should be validate the required fields', async () => {
            let traceabilityId: undefined;            

            jest.spyOn(traceabilityRepository, 'getById').mockResolvedValue(traceabilityId);

            await expect(traceabilityService.getById(traceabilityId)).rejects.toThrow("Field traceabilityId is required.");                
        });

        it('Should be validate create', async () => {     

            jest.spyOn(traceabilityService, 'postData').mockResolvedValue(Promise.resolve(traceFake.animalId.toHexString()));

            expect(await traceabilityService.create(traceFake)).toBe(traceFake.animalId.toHexString());                
        });

        it('Should be validate put', async () => {     

            jest.spyOn(traceabilityService, 'putData').mockResolvedValue(Promise.resolve(putTraceFake.animalId.toHexString()));

            expect(await traceabilityService.update(putTraceFake)).toBe(putTraceFake.animalId.toHexString());                
        });

        it('Should be validate delete', async () => {     
            let messageDelete: string = "message: registro deletado com sucesso.";

            jest.spyOn(traceabilityService, 'deleteData').mockResolvedValue(Promise.resolve(messageDelete));

            expect(await traceabilityService.delete(deleteTraceFake)).toBe("message: registro deletado com sucesso.");                
        });

        it('Should be work getById!', async () => {
            const traceabilityId: string = "000001";            
            
            jest.spyOn(traceabilityService, "getData").mockImplementation(() => Promise.resolve(traceabilityId));       

            expect(await traceabilityService.getById(traceabilityId)).toBe("000001");
        });             
        
        it('Should be work getAll!', async () => {           
            jest.spyOn(traceabilityService, "getAllData").mockImplementation(() => Promise.resolve(""));       

            expect(await traceabilityService.getAll()).toBe("");
        });                
    });
});