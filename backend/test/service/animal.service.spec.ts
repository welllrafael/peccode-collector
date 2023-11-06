import { sex } from '../../src/entities/farmLot.entity';
import { PostAnimalDTO, PutAnimalDTO, DeleteAnimalDTO } from '../../src/dto/animal.dto';
import { AnimalRepository } from '../../src/repositories/animal.repository';
import { AnimalService } from '../../src/service/animal.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BSON } from 'realm';

describe('Animal Service', () => {

    let app: INestApplication;
    let animalService: AnimalService;     
    let animalRepository: AnimalRepository;

    const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");

    const traceFake: PostAnimalDTO =
    {        
        id: idFake,
        farmId: idFake,
        breedId: idFake, 
        sex: sex.Macho,
        status: true, 
        farmGrowerId: idFake,
        birthDate: new Date(Date.now()),
        inputDate: new Date(Date.now())
    };
    
    const putTraceFake: PutAnimalDTO =
    {
        id: idFake,
        farmId: idFake,
        breedId: idFake, 
        sex: sex.Macho,
        status: true, 
        farmGrowerId: idFake,
        birthDate: new Date(Date.now()),
        inputDate: new Date(Date.now())
    };
    
    const deleteTraceFake: DeleteAnimalDTO =
    {
        id: idFake
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AnimalService, AnimalRepository],                        
        }).compile();

        animalRepository = await module.get<AnimalRepository>(AnimalRepository);
        animalService = await module.get(AnimalService);

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing fields Animal service', () => {

        it('Should be validate validateDto method', async () => {     
            const setVerb: number = 0;
            const setRepository: string = "AnimalRepository";
            const result: any = undefined;            

            expect(await animalService.validateDto(traceFake, setRepository, setVerb)).toBe(result);                
        });

        it('Should be validate create', async () => {     
            const setRepository: string = "0";

            jest.spyOn(animalService, 'postData').mockResolvedValue(Promise.resolve(traceFake.id.toHexString()));

            expect(await animalService.create(traceFake, setRepository)).toBe(traceFake.id.toHexString());                
        });

        it('Should be validate put', async () => {     
            const setRepository: string = "0";

            jest.spyOn(animalService, 'putData').mockResolvedValue(Promise.resolve(putTraceFake.id.toHexString()));

            expect(await animalService.update(putTraceFake, setRepository)).toBe(putTraceFake.id.toHexString());                
        });

        it('Should be validate delete', async () => {     
            let messageDelete: string = "message: registro deletado com sucesso.";
            const setRepository: string = "0";

            jest.spyOn(animalService, 'deleteData').mockResolvedValue(Promise.resolve(messageDelete));

            expect(await animalService.delete(deleteTraceFake, setRepository)).toBe("message: registro deletado com sucesso.");                
        });

        it('Should be validate the required fields in getById', async () => {
            let id: undefined;
            let setRepository: undefined;

            jest.spyOn(animalRepository, 'getById').mockResolvedValue(id);

            await expect(animalService.getById(id, setRepository))
            .rejects.toThrow("Field id is required.");                
        });

        it('Should be validate the required fields in getAll data', async () => {
            let setRepository: undefined;

            jest.spyOn(animalRepository, 'getAll').mockResolvedValue(setRepository);

            await expect(animalService.getAll(setRepository))
            .rejects.toThrow("Field typeAnimal is required.");                
        });

        it('Should be a number in setRepository', async () => {
            let id: string = "000001";
            let setRepository: string = "A";

            jest.spyOn(animalRepository, 'getById').mockResolvedValue(id);

            expect(animalService.getById(id, setRepository))
            .rejects.toThrow("Field typeAnimal is required and must be a number.");                
        });                

        it('Should be validate a animalType out of range in getById', async () => {
            let id: string = "000001";
            let setRepository: string = "99";

            jest.spyOn(animalRepository, 'getById').mockResolvedValue(id);

            expect(animalService.getById(id, setRepository))
            .rejects.toThrow("Type out of range.");                
        });                

        it('Should be validate a animalType out of range in getAll', async () => {            
            let setRepository: string = "99";

            expect(animalService.getAll(setRepository))
            .rejects.toThrow("Type out of range.");                
        });                

        it('Should be work!', async () => {
            const id: string = "000001";
            const setRepository: string = "0";
            
            jest.spyOn(animalService, "getData").mockImplementation(() => Promise.resolve(id));       

            expect(await animalService.getById(id, setRepository)).toBe("000001");
        });

        it('Should be work getAll!', async () => {         
            const setRepository: string = "0";

            jest.spyOn(animalService, "getAllData").mockImplementation(() => Promise.resolve(""));       

            expect(await animalService.getAll(setRepository)).toBe("");
        });        
    });
});