import { GrowerRepository } from '../../src/repositories/grower.repository';
import { GrowerService } from '../../src/service/grower.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('Farm Service', () => {

    let app: INestApplication;
    let growerService: GrowerService;     
    let growerRepository: GrowerRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GrowerService, GrowerRepository],                        
        }).compile();

        growerRepository = await module.get<GrowerRepository>(GrowerRepository);
        growerService = await module.get(GrowerService);

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing fields Grower service', () => {
        
        it('Should be validate the required fields', async () => {
            let growerId: undefined;            

            jest.spyOn(growerRepository, 'getById').mockResolvedValue(growerId);

            await expect(growerService.getById(growerId)).rejects.toThrow("Field growerId is required and must be a number.");                
        });

        it('Should be work getById!', async () => {
            const growerId: string = "000001";            
            
            jest.spyOn(growerService, "getData").mockImplementation(() => Promise.resolve(growerId));       

            expect(await growerService.getById(growerId)).toBe("000001");
        });
        
        it('Should be work getAll getAll!', async () => {           
            jest.spyOn(growerService, "getAllData").mockImplementation(() => Promise.resolve(""));       

            expect(await growerService.getAll()).toBe("");
        });                
    });
});