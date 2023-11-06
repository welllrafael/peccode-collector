import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SisbovRequestRepository } from '../../src/repositories/sisbovRequest.repository';
import { SisbovNumberRepository } from '../../src/repositories/sisbovNumber.repository';
import { SisbovService } from '../../src/service/sisbov.service';

describe('Sisbov Service', () => {

    let app: INestApplication;
    let sisbovService: SisbovService;     
    let sisbovNumberRepository: SisbovNumberRepository;
    let sisbovRequestRepository: SisbovRequestRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SisbovService, SisbovNumberRepository, SisbovRequestRepository],                        
        }).compile();

        sisbovNumberRepository = await module.get<SisbovNumberRepository>(SisbovNumberRepository);
        sisbovRequestRepository = await module.get<SisbovRequestRepository>(SisbovRequestRepository);
        sisbovService = await module.get(SisbovService);

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing fields Sisbov service', () => {
        
        it('Should be validate the required fields', async () => {
            let id: undefined;
            let setRepository: undefined;

            jest.spyOn(sisbovNumberRepository, 'getById').mockResolvedValue(id);

            await expect(sisbovService.getById(id, setRepository))
            .rejects.toThrow("Field id is required and must be a number.");                
        });

        it('Should be a number in id', async () => {
            let id: string = "A";
            let setRepository: string = "1";

            jest.spyOn(sisbovRequestRepository, 'getById').mockResolvedValue(id);

            await expect(sisbovService.getById(id, setRepository))
            .rejects.toThrow("Field id is required and must be a number.");                
        });        

        it('Should be a number in setRepository', async () => {
            let id: string = "000001";
            let setRepository: string = "A";

            jest.spyOn(sisbovRequestRepository, 'getById').mockResolvedValue(id);

            expect(sisbovService.getById(id, setRepository))
            .rejects.toThrow("Field typeSisbov is required and must be a number.");                
        });                

        it('Should be validate a sisbovType out of range getById', async () => {
            let id: string = "000001";
            let setRepository: string = "99";

            jest.spyOn(sisbovRequestRepository, 'getById').mockResolvedValue(id);

            expect(sisbovService.getById(id, setRepository))
            .rejects.toThrow("Type out of range.");                
        });                

        it('Should be validate a sisbovType out of range getAll', async () => {            
            let setRepository: string = "99";

            jest.spyOn(sisbovService, 'getAllData').mockResolvedValue(setRepository);

            expect(sisbovService.getAll(setRepository))
            .rejects.toThrow("Type out of range.");                
        });                

        it('Should be validate a sisbovType required getAll', async () => {            
            let setRepository: string = "";

            jest.spyOn(sisbovService, "getAllData").mockResolvedValue(setRepository);

            expect(sisbovService.getAll(setRepository))
            .rejects.toThrow("Field typeSisbov is required and must be a number.");                
        });                

        it('Should be work getById!', async () => {
            const id: string = "000001";
            const setRepository: string = "0";
            
            jest.spyOn(sisbovService, "getData").mockImplementation(() => Promise.resolve(id));       

            expect(await sisbovService.getById(id, setRepository)).toBe("000001");
        });                

        it('Should be work getAllData!', async () => {            
            const setRepository: string = "0";
            
            jest.spyOn(sisbovService, "getAllData").mockImplementation(() => Promise.resolve(""));       

            expect(await sisbovService.getAll(setRepository)).toBe("");
        });                
    });
});