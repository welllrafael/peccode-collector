import { InputOperationService } from './../../src/service/inputOperation.service';
import { InputOperationController } from './../../src/controller/inputOperation.controller';
import { InputOperation } from './../../src/entities/inputOperation';
import { InputOperationGenericDTO } from './../../src/dto/inputOperationGeneric.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { BSON, ObjectSchema } from 'realm';

const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");
const inputOperationEntityList: InputOperation = {
    _id: idFake,	
    farmId: 1,
    animalInputMovementId: 1,
    farmGrowerId: 1,
    quantity: 1,
    obs: 'teste input operation',
    operationStatus: 'ativo',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    deletedAt: new Date(Date.now()),
};

const inputOperationEntityStruct: ObjectSchema = {
	name: 'InputOperation',
	properties: {
		_id: 'uuid',        
        farmId: 'int',
        animalInputMovementId: "int",
        farmGrowerId: "int",
        quantity: "int",
        obs: 'string',
        operationStatus: 'string',
        createdAt: 'date',
        updatedAt: 'date',
        deletedAt: 'date'
	},
	primaryKey: '_id'
};

const inputOperationAll: InputOperation[] = [
    inputOperationEntityList,
    inputOperationEntityList
]

const inputOperationDTO: InputOperationGenericDTO = {
    id: idFake
}

const fakeInputOperationCreate = { code: 201, id: "6233aec8ccea79eca50d512e" }

const fakeInputOperationUpdate = JSON.stringify(inputOperationEntityList)

const fakeInputOperationDelete = { code: 201, id: "registro deletado com sucesso" }

describe('InputOperationController', () => {

    let inputOperationController: InputOperationController;     
    let inputOperationService: InputOperationService;  

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [InputOperationController],
            providers: [{
                provide: InputOperationService,
                useValue: {
                    getById: jest.fn().mockResolvedValue(JSON.stringify(inputOperationEntityList)),
                    getStruct: jest.fn().mockResolvedValue(JSON.stringify(inputOperationEntityStruct)),
                    getAll: jest.fn().mockResolvedValue(JSON.stringify(inputOperationAll)),
                    create: jest.fn().mockResolvedValue(JSON.stringify(fakeInputOperationCreate)),
                    update: jest.fn().mockResolvedValue(JSON.stringify(fakeInputOperationUpdate)),
                    delete: jest.fn().mockResolvedValue(JSON.stringify(fakeInputOperationDelete))
                }
            }],
        }).compile();

        inputOperationController = module.get<InputOperationController>(InputOperationController);
        inputOperationService = module.get<InputOperationService>(InputOperationService);
    });

    it('Should be defined', () => {                    
        expect(inputOperationController).toBeDefined();
        expect(inputOperationService).toBeDefined();
    }); 

    it('should get a input operation item successfully', async () => {
        const setRepository = "0";
        const id = "000001";
        const result = await inputOperationController.getById(id, setRepository);
  
        expect(result).toEqual(JSON.stringify(inputOperationEntityList));
        expect(inputOperationService.getById).toHaveBeenCalledTimes(1);
    });

    it('should get a input operation struct successfully', async () => {
        const setType = "0";
        const result = await inputOperationController.getStruct(setType);

        expect(result).toEqual(JSON.stringify(inputOperationEntityStruct));        
    });

    it('should getAll input operation successfully', async () => {
        const setType = "0";
        const result = await inputOperationController.getAll(setType);

        expect(result).toEqual(JSON.stringify(inputOperationAll));        
    });

    it('should create input operation successfully', async () => {
        const setType = "0";
        const result = await inputOperationController.postInputOperation(inputOperationDTO,setType);

        expect(result).toEqual(JSON.stringify(fakeInputOperationCreate));        
    });

    it('should update input operation successfully', async () => {
        const setType = "0";
        const result = await inputOperationController.putInputOperation(inputOperationDTO,setType);

        expect(result).toEqual(JSON.stringify(fakeInputOperationUpdate));        
    });

    it('should delete input operation successfully', async () => {
        const setType = "0";
        const result = await inputOperationController.deleteInputOperation(inputOperationDTO,setType);

        expect(result).toEqual(JSON.stringify(fakeInputOperationDelete));        
    });
});