import { PostIdeDTO, PutIdeDTO, DeleteIdeDTO } from '../../src/dto/ide.dto';
import { Ide } from '../../src/entities/ide.entity';
import { IdeService } from '../../src/service/ide.service';
import { IdeController } from '../../src/controller/ide.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { BSON, ObjectSchema } from 'realm';

const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");
const ideEntityList: Ide = {
	_id: idFake,
	animalId: idFake,
	status: true
};

const ideEntityStruct: ObjectSchema = {
	name: 'Ide',
	properties: {
		_id: 'objectId',
		IdeId: 'string',
		animalId: 'string',
		status: 'bool'
	},
	primaryKey: '_id'
};

const ideAll: Ide[] = [ideEntityList, ideEntityList]

const idePostDto : PostIdeDTO = {
    animalId: idFake,
    
    status: true
}

const idePutDto : PutIdeDTO = {
    id: idFake, 
    animalId: idFake,
    status: true
}

const ideDelDto : DeleteIdeDTO = {
    id: idFake
}

const fakeIdeCreate = { code: 201, id: "6233aec8ccea79eca50d512e" }
const fakeIdeUpdate = JSON.stringify(ideEntityList)
const fakeIdeDelete = { code: 200, message: "registro deletado com sucesso." }

describe('IdeController', () => {

    let ideController: IdeController;     
    let ideService: IdeService;  

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [IdeController],
            providers: [{
                provide: IdeService,
                useValue: {
                    getById: jest.fn().mockResolvedValue(JSON.stringify(ideEntityList)),
                    getStruct: jest.fn().mockResolvedValue(JSON.stringify(ideEntityStruct)), 
                    getAll: jest.fn().mockResolvedValue(JSON.stringify(ideAll)),   
                    create: jest.fn().mockResolvedValue(JSON.stringify(fakeIdeCreate)), 
                    update: jest.fn().mockResolvedValue(JSON.stringify(fakeIdeUpdate)),                    
                    delete: jest.fn().mockResolvedValue(JSON.stringify(fakeIdeDelete))
                }
            }],
        }).compile();

        ideController = module.get<IdeController>(IdeController);
        ideService = module.get<IdeService>(IdeService);
    });

    it('Should be defined', () => {                    
        expect(ideController).toBeDefined();
        expect(ideService).toBeDefined();
    }); 

    it('should get a ide item successfully', async () => {        
        const id = "000001";
        const result = await ideController.getById(id);
  
        expect(result).toEqual(JSON.stringify(ideEntityList));
        expect(ideService.getById).toHaveBeenCalledTimes(1);
    });

    it('should get a ide struct successfully', async () => {        
        const result = await ideController.getStruct();

        expect(result).toEqual(JSON.stringify(ideEntityStruct));        
    });

    it('should getAll ide successfully', async () => {        
        const result = await ideController.getAll();

        expect(result).toEqual(JSON.stringify(ideAll));        
    });

    it('should create ide successfully', async () => {        
        const result = await ideController.postIde(idePostDto);

        expect(result).toEqual(JSON.stringify(fakeIdeCreate));        
    });

    it('should update ide successfully', async () => {        
        const result = await ideController.putIde(idePutDto);

        expect(result).toEqual(JSON.stringify(fakeIdeUpdate));        
    });

    it('should delete ide successfully', async () => {        
        const result = await ideController.deleteIde(ideDelDto);

        expect(result).toEqual(JSON.stringify(fakeIdeDelete));        
    });

});