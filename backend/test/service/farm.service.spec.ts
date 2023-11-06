import { FarmRepository } from '../../src/repositories/farm.repository';
import { FarmService } from '../../src/service/farm.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('Farm Service', () => {

    let app: INestApplication;
    let farmService: FarmService;     
    let farmRepository: FarmRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FarmService, FarmRepository],                        
        }).compile();

        farmRepository = await module.get<FarmRepository>(FarmRepository);
        farmService = await module.get(FarmService);

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing fields Farm service', () => {
        
        it('Should be validate the required fields', async () => {
            let id: undefined;
            let setRepository: undefined;

            jest.spyOn(farmRepository, 'getById').mockResolvedValue(id);

            await expect(farmService.getById(id, setRepository))
            .rejects.toThrow("Field id is required and must be a number.");                
        });

        it('Should be a number in id', async () => {
            let id: string = "A";
            let setRepository: string = "1";

            jest.spyOn(farmRepository, 'getById').mockResolvedValue(id);

            await expect(farmService.getById(id, setRepository))
            .rejects.toThrow("Field id is required and must be a number.");                
        });        

        it('Should be a number in setRepository', async () => {
            let id: string = "000001";
            let setRepository: string = "A";

            jest.spyOn(farmRepository, 'getById').mockResolvedValue(id);

            expect(farmService.getById(id, setRepository))
            .rejects.toThrow("Field typeFarm is required and must be a number.");                
        });                

        it('Should be validate a farmType out of range getById', async () => {
            let id: string = "000001";
            let setRepository: string = "99";

            jest.spyOn(farmRepository, 'getById').mockResolvedValue(id);

            expect(farmService.getById(id, setRepository))
            .rejects.toThrow("Type out of range.");                
        });                

        it('Should be work getById!', async () => {
            const id: string = "000001";
            const setRepository: string = "0";
            
            jest.spyOn(farmService, "getData").mockImplementation(() => Promise.resolve(id));       

            expect(await farmService.getById(id, setRepository)).toBe("000001");
        });                

        it('Should be validate a breedType out of range in getAll', async () => {            
            let setRepository: string = "99";

            jest.spyOn(farmService, 'getAllData').mockResolvedValue(setRepository);

            expect(farmService.getAll(setRepository))
            .rejects.toThrow("Type out of range.");                
        });                

        it('Should be validate a breedType not empty in getAll', async () => {            
            let setRepository: string = "";

            jest.spyOn(farmService, 'getAllData').mockResolvedValue(setRepository);

            expect(farmService.getAll(setRepository))
            .rejects.toThrow("Field typeFarm is required and must be a number.");                
        });      
        
        it('Should be work getAll getAll!', async () => {           
            let setRepository: string = "0";

            jest.spyOn(farmService, "getAllData").mockImplementation(() => Promise.resolve(""));       

            expect(await farmService.getAll(setRepository)).toBe("");
        });
    });
});