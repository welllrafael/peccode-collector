import { DeleteIdvDTO, PostIdvDTO, PutIdvDTO } from '../../src/dto/idv.dto';
import { Idv } from '../../src/entities/idv.entity';
import { IdvService } from '../../src/service/idv.service';
import { IdvController } from '../../src/controller/idv.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { BSON, ObjectSchema } from 'realm';

const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");
const idvEntityList: Idv = {
	_id: idFake,
	animalId: idFake,
	status: true
};

const idvEntityStruct: ObjectSchema = {
	name: 'Idv',
	properties: {
		_id: 'objectId',
		IdvId: 'string',
		animalId: 'string',
		status: 'bool'
	},
	primaryKey: '_id'
};

const idvAll: Idv[] = [idvEntityList,idvEntityList]

const idvPostDto: PostIdvDTO = {
    animalId: idFake,
    status: true
}

const idvPutDto: PutIdvDTO = {
    id: idFake,
    animalId: idFake,
    status: true
}

const idvDelDto: DeleteIdvDTO = {
    id: idFake
}

const fakeIdvCreate = { code: 201, id: "6233aec8ccea79eca50d512e" }
const fakeIdvUpdate = JSON.stringify(idvEntityList)
const fakeIdvDelete = { code: 200, message: "registro deletado com sucesso." }

describe('IdvController', () => {

    let idvController: IdvController;     
    let idvService: IdvService;  

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [IdvController],
            providers: [{
                provide: IdvService,
                useValue: {
                    getById: jest.fn().mockResolvedValue(JSON.stringify(idvEntityList)),
                    getStruct: jest.fn().mockResolvedValue(JSON.stringify(idvEntityStruct)), 
                    getAll: jest.fn().mockResolvedValue(JSON.stringify(idvAll)), 
                    create: jest.fn().mockResolvedValue(JSON.stringify(fakeIdvCreate)), 
                    update: jest.fn().mockResolvedValue(JSON.stringify(fakeIdvUpdate)),                    
                    delete: jest.fn().mockResolvedValue(JSON.stringify(fakeIdvDelete))                   
                }
            }],
        }).compile();

        idvController = module.get<IdvController>(IdvController);
        idvService = module.get<IdvService>(IdvService);
    });

    it('Should be defined', () => {                    
        expect(idvController).toBeDefined();
        expect(idvService).toBeDefined();
    }); 

    it('should get a idv item successfully', async () => {        
        const id = "000001";
        const result = await idvController.getById(id);
  
        expect(result).toEqual(JSON.stringify(idvEntityList));
        expect(idvService.getById).toHaveBeenCalledTimes(1);
    });

    it('should get a idv struct successfully', async () => {        
        const result = await idvController.getStruct();
    
        expect(result).toEqual(JSON.stringify(idvEntityStruct));        
    });
    
    it('should getAll idv struct successfully', async () => {        
        const result = await idvController.getAll();
    
        expect(result).toEqual(JSON.stringify(idvAll));        
    });

    it('should create ide successfully', async () => {        
        const result = await idvController.postIdv(idvPostDto);

        expect(result).toEqual(JSON.stringify(fakeIdvCreate));        
    });

    it('should update ide successfully', async () => {        
        const result = await idvController.putIdv(idvPutDto);

        expect(result).toEqual(JSON.stringify(fakeIdvUpdate));        
    });

    it('should delete ide successfully', async () => {        
        const result = await idvController.deleteIdv(idvDelDto);

        expect(result).toEqual(JSON.stringify(fakeIdvDelete));        
    });

});