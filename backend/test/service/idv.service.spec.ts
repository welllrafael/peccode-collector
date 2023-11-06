import { DeleteIdvDTO, PostIdvDTO, PutIdvDTO } from '../../src/dto/idv.dto';
import { IdvRepository } from '../../src/repositories/idv.repository';
import { IdvService } from '../../src/service/idv.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from "bson";
import { BSON } from 'realm';

describe('Idv Service', () => {

    let app: INestApplication;
    let idvService: IdvService;     
    let idvRepository: IdvRepository;

    const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");

    const traceFake: PostIdvDTO =
    {
        animalId: idFake,
        status: true
    };
    
    const putTraceFake: PutIdvDTO =
    {
        id: idFake,
        animalId: idFake,
        status: true 
    };
    
    const deleteTraceFake: DeleteIdvDTO =
    {
        id: idFake
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [IdvService, IdvRepository],                        
        }).compile();

        idvRepository = await module.get<IdvRepository>(IdvRepository);
        idvService = await module.get(IdvService);

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing fields Idv service', () => {
        
        it('Should be validate the required fields', async () => {
            let idvId: undefined;            

            jest.spyOn(idvRepository, 'getById').mockResolvedValue(idvId);

            await expect(idvService.getById(idvId)).rejects.toThrow("Field idvId is required.");                
        });

        it('Should be validate create', async () => {     

            jest.spyOn(idvService, 'postData').mockResolvedValue(Promise.resolve(traceFake.animalId.toHexString()));

            expect(await idvService.create(traceFake)).toBe(traceFake.animalId.toHexString());                
        });

        it('Should be validate put', async () => {     

            jest.spyOn(idvService, 'putData').mockResolvedValue(Promise.resolve(putTraceFake.id.toHexString()));

            expect(await idvService.update(putTraceFake)).toBe(putTraceFake.id.toHexString());                
        });

        it('Should be work getById!', async () => {
            const idvId: string = "000001";            
            
            jest.spyOn(idvService, "getData").mockImplementation(() => Promise.resolve(idvId));       

            expect(await idvService.getById(idvId)).toBe("000001");
        });          

        it('Should be validate delete', async () => {     
            let messageDelete: string = "message: registro deletado com sucesso.";

            jest.spyOn(idvService, 'deleteData').mockResolvedValue(Promise.resolve(messageDelete));

            expect(await idvService.delete(deleteTraceFake)).toBe("message: registro deletado com sucesso.");                
        });

        it('Should be work getAllData!', async () => {            
            const setRepository: string = "0";
            
            jest.spyOn(idvService, "getAllData").mockImplementation(() => Promise.resolve(""));       

            expect(await idvService.getAll()).toBe("");
        });                
    });
});