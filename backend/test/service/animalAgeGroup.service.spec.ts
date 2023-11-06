import { AnimalAgeGroupRepository } from '../../src/repositories/animalAgeGroup.repository';
import { AnimalAgeGroupService } from '../../src/service/animalAgeGroup.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('Farm Service', () => {

    let app: INestApplication;
    let animalAgeGroupService: AnimalAgeGroupService;     
    let animalAgeGroupRepository: AnimalAgeGroupRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AnimalAgeGroupService, AnimalAgeGroupRepository],                        
        }).compile();

        animalAgeGroupRepository = await module.get<AnimalAgeGroupRepository>(AnimalAgeGroupRepository);
        animalAgeGroupService = await module.get(AnimalAgeGroupService);

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing fields AnimalAgeGroup service', () => {
        
        it('Should be validate the required fields', async () => {
            let animalAgeGroupId: undefined;            

            jest.spyOn(animalAgeGroupService, 'getData').mockResolvedValue(animalAgeGroupId);

            await expect(animalAgeGroupService.getById(animalAgeGroupId)).rejects.toThrow("Field id is required.");                
        });

        it('Should be work getById!', async () => {
            const animalAgeGroupId: string = "000001";            
            
            jest.spyOn(animalAgeGroupService, "getData").mockImplementation(() => Promise.resolve(animalAgeGroupId));       

            expect(await animalAgeGroupService.getById(animalAgeGroupId)).toBe("000001");
        });                

        it('Should be work getAll!', async () => {                    
            jest.spyOn(animalAgeGroupService, "getAllData").mockImplementation(() => Promise.resolve(""));       

            expect(await animalAgeGroupService.getAll()).toBe("");
        });                
    });
});