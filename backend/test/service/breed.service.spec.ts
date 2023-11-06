import { BreedRepository } from '../../src/repositories/breed.repository';
import { BreedService } from '../../src/service/breed.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('Breed Service', () => {

    let app: INestApplication;
    let breedService: BreedService;     
    let breedRepository: BreedRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BreedService, BreedRepository],                        
        }).compile();

        breedRepository = await module.get<BreedRepository>(BreedRepository);
        breedService = await module.get(BreedService);

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing fields Breed service', () => {
        
        it('Should be validate the required fields', async () => {
            let id: undefined;
            let setRepository: undefined;

            jest.spyOn(breedRepository, 'getById').mockResolvedValue(id);

            await expect(breedService.getById(id, setRepository))
            .rejects.toThrow("Field id is required and must be a number.");                
        });

        it('Should be a number in id', async () => {
            let id: string = "A";
            let setRepository: string = "1";

            jest.spyOn(breedRepository, 'getById').mockResolvedValue(id);

            await expect(breedService.getById(id, setRepository))
            .rejects.toThrow("Field id is required and must be a number.");                
        });        

        it('Should be a number in setRepository', async () => {
            let id: string = "000001";
            let setRepository: string = "A";

            jest.spyOn(breedRepository, 'getById').mockResolvedValue(id);

            expect(breedService.getById(id, setRepository))
            .rejects.toThrow("Field typeBreed is required and must be a number.");                
        });                

        it('Should be validate a breedType out of range in getById', async () => {
            let id: string = "000001";
            let setRepository: string = "99";

            jest.spyOn(breedRepository, 'getById').mockResolvedValue(id);

            expect(breedService.getById(id, setRepository))
            .rejects.toThrow("Type out of range.");                
        });                

        it('Should be validate a breedType out of range in getAll', async () => {            
            let setRepository: string = "99";

            jest.spyOn(breedRepository, 'getAll').mockResolvedValue(setRepository);

            expect(breedService.getAll(setRepository))
            .rejects.toThrow("Type out of range.");                
        });                

        it('Should be validate a breedType not empty in getAll', async () => {            
            let setRepository: string = "";

            jest.spyOn(breedRepository, 'getAll').mockResolvedValue(setRepository);

            expect(breedService.getAll(setRepository))
            .rejects.toThrow("Field typeBreed is required and must be a number.");                
        });                

        it('Should be work getById!', async () => {
            const id: string = "000001";
            const setRepository: string = "0";
            
            jest.spyOn(breedService, "getData").mockImplementation(() => Promise.resolve(id));       

            expect(await breedService.getById(id, setRepository)).toBe("000001");
        }); 
        
        it('Should be work getAll!', async () => {   
            const setRepository: string = "0";

            jest.spyOn(breedService, "getAllData").mockImplementation(() => Promise.resolve(""));       

            expect(await breedService.getAll(setRepository)).toBe("");
        });                
    });
});