import { Farm, farmType } from '../../src/entities/farm.entity';
import { FarmService } from '../../src/service/farm.service';
import { FarmController } from '../../src/controller/farm.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { BSON, ObjectSchema } from 'realm';

const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");
const farmEntityList: Farm = {
    _id: idFake,
	description: "Fazenda Teste",
	farmType: farmType.Fazenda_Grupo,
	personalIdentifier: 1, 
	IE: 123456, 
	status: true, 
	tracked: true, 
	establishmentCode: 123456,
	erasCode: 1,
	nirfinc: 123456789,
	growerId: 1
};

const farmEntityStruct: ObjectSchema = {
	name: 'Farm',
	properties: {
		_id: 'objectId',
		farmId: 'int', 
		description: 'string',
		farmType: 'string',
		personalIdentifier: 'int',
		IE: 'int',
		status: 'bool',
		tracked: 'bool',
		establishmentCode: 'int',
		erasCode: 'int',
		nirfinc: 'int',
		growerId: 'int'
	},
	primaryKey: '_id'
};

const farmEntityAll: Farm[] = [farmEntityList, farmEntityList]

describe('FarmController', () => {

    let farmController: FarmController;     
    let farmService: FarmService;  

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FarmController],
            providers: [{
                provide: FarmService,
                useValue: {
                    getById: jest.fn().mockResolvedValue(JSON.stringify(farmEntityList)),
                    getStruct: jest.fn().mockResolvedValue(JSON.stringify(farmEntityStruct)),   
                    getAll: jest.fn().mockResolvedValue(JSON.stringify(farmEntityAll)),                    
                }
            }],
        }).compile();

        farmController = module.get<FarmController>(FarmController);
        farmService = module.get<FarmService>(FarmService);
    });

    it('Should be defined', () => {                    
        expect(farmController).toBeDefined();
        expect(farmService).toBeDefined();
    }); 

    it('should get a farm item successfully', async () => {
        const setRepository = "0";
        const id = "000001";
        const result = await farmController.getById(id, setRepository);
  
        expect(result).toEqual(JSON.stringify(farmEntityList));
        expect(farmService.getById).toHaveBeenCalledTimes(1);
    });

    it('should get a farm struct successfully', async () => {
        const setType = "0";
        const result = await farmController.getStruct(setType);

        expect(result).toEqual(JSON.stringify(farmEntityStruct));        
    });      

    it('should getAll farm successfully', async () => {
        const setType = "0";
        const result = await farmController.getAll(setType);

        expect(result).toEqual(JSON.stringify(farmEntityAll));        
    });      

});