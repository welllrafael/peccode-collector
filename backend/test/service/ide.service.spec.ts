import { DeleteIdeDTO, PostIdeDTO, PutIdeDTO } from '../../src/dto/ide.dto';
import { IdeRepository } from '../../src/repositories/ide.repository';
import { IdeService } from '../../src/service/ide.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from "bson";
import { BSON } from 'realm';

describe('Ide Service', () => {

    let app: INestApplication;
    let ideService: IdeService;     
    let ideRepository: IdeRepository;

    const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");

    const traceFake: PostIdeDTO =
    {
        animalId: idFake,
        status: true
    };
    
    const putTraceFake: PutIdeDTO =
    {
        id: idFake,
        animalId: idFake,
        status: true 
    };
    
    const deleteTraceFake: DeleteIdeDTO =
    {
        id: idFake
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [IdeService, IdeRepository],                        
        }).compile();

        ideRepository = await module.get<IdeRepository>(IdeRepository);
        ideService = await module.get(IdeService);

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing fields Ide service', () => {
        
        it('Should be validate the required fields', async () => {
            let ideId: undefined;            

            jest.spyOn(ideRepository, 'getById').mockResolvedValue(ideId);

            await expect(ideService.getById(ideId)).rejects.toThrow("Field ideId is required.");                
        });

        it('Should be validate create', async () => {     

            jest.spyOn(ideService, 'postData').mockResolvedValue(Promise.resolve(traceFake.animalId.toHexString()));

            expect(await ideService.create(traceFake)).toBe(traceFake.animalId.toHexString());                
        });

        it('Should be validate put', async () => {     

            jest.spyOn(ideService, 'putData').mockResolvedValue(Promise.resolve(putTraceFake.id.toHexString()));

            expect(await ideService.update(putTraceFake)).toBe(putTraceFake.id.toHexString());                
        });

        it('Should be validate delete', async () => {     
            let messageDelete: string = "message: registro deletado com sucesso.";

            jest.spyOn(ideService, 'deleteData').mockResolvedValue(Promise.resolve(messageDelete));

            expect(await ideService.delete(deleteTraceFake)).toBe("message: registro deletado com sucesso.");                
        });

        it('Should be work getById!', async () => {
            const ideId: string = "000001";            
            
            jest.spyOn(ideService, "getData").mockImplementation(() => Promise.resolve(ideId));       

            expect(await ideService.getById(ideId)).toBe("000001");
        });        
        
        it('Should be work getAll!', async () => {           
            jest.spyOn(ideService, "getAllData").mockImplementation(() => Promise.resolve(""));       

            expect(await ideService.getAll()).toBe("");
        });                
    });
});