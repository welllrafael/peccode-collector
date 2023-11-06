import { SisbovRequest } from '../../src/entities/sisbovRequest.entity';
import { SisbovService } from '../../src/service/sisbov.service';
import { SisbovController } from '../../src/controller/sisbov.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { BSON, ObjectSchema } from 'realm';

const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");
const sisbovEntityList: SisbovRequest = {
    _id: idFake,
	requestNumber: 1,
	farmId: idFake,
	requestDate: new Date(Date.now()),
	initialSISBOV: 1,
	finalSISBOV: 1
};

const sisbovEntityStruct: ObjectSchema = {
	name: 'SisbovNumber',
	properties: {
		_id: 'objectId',
		sisbovNumber: 'int',
		requestNumber: 'int',
		status: 'int',
		ide: 'string'
	},
	primaryKey: '_id'
};

const sisbovAll: SisbovRequest[] = [sisbovEntityList, sisbovEntityList]

describe('SisbovController', () => {

    let sisbovController: SisbovController;     
    let sisbovService: SisbovService;  

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SisbovController],
            providers: [{
                provide: SisbovService,
                useValue: {
                    getById: jest.fn().mockResolvedValue(JSON.stringify(sisbovEntityList)),                    
                    getStruct: jest.fn().mockResolvedValue(JSON.stringify(sisbovEntityStruct)), 
                    getAll: jest.fn().mockResolvedValue(JSON.stringify(sisbovAll)), 
                }
            }],
        }).compile();

        sisbovController = module.get<SisbovController>(SisbovController);
        sisbovService = module.get<SisbovService>(SisbovService);
    });

    it('Should be defined', () => {                    
        expect(sisbovController).toBeDefined();
        expect(sisbovService).toBeDefined();
    }); 

    it('should get a sisbov item successfully', async () => {
        const setRepository = "0";
        const id = "000001";
        const result = await sisbovController.getById(id, setRepository);
  
        expect(result).toEqual(JSON.stringify(sisbovEntityList));
        expect(sisbovService.getById).toHaveBeenCalledTimes(1);
    });

    it('should get a sisbov struct successfully', async () => {
        const setType = "0";
        const result = await sisbovController.getStruct(setType);

        expect(result).toEqual(JSON.stringify(sisbovEntityStruct));        
    });    

    it('should getAll sisbov struct successfully', async () => {
        const setType = "0";
        const result = await sisbovController.getAll(setType);

        expect(result).toEqual(JSON.stringify(sisbovAll));        
    });    

});