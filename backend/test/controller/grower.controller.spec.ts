import { Grower } from '../../src/entities/grower.entity';
import { GrowerService } from '../../src/service/grower.service';
import { GrowerController } from '../../src/controller/grower.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { BSON, ObjectSchema } from 'realm';

const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");
const growerEntityList: Grower = {
	_id: idFake,
	name: "grower",
	status: true,
	personalIdentifier: 123456,
	IE: 123456,
	addressId: idFake
};

const growerEntityStruct: ObjectSchema = {
	name: 'Grower',
	properties: {
		_id: 'objectId',
		growerId: 'int',
		name: 'string',
		status: 'bool',
		personalIdentifier: 'int',
		IE: 'int',
		addressId: 'int'
	},
	primaryKey: '_id'
};

const growerAll: Grower[] = [growerEntityList,growerEntityList]

describe('GrowerController', () => {

    let growerController: GrowerController;     
    let growerService: GrowerService;  

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GrowerController],
            providers: [{
                provide: GrowerService,
                useValue: {
                    getById: jest.fn().mockResolvedValue(JSON.stringify(growerEntityList)),
                    getStruct: jest.fn().mockResolvedValue(JSON.stringify(growerEntityStruct)),          
                    getAll: jest.fn().mockResolvedValue(JSON.stringify(growerAll)),                    
                }
            }],
        }).compile();

        growerController = module.get<GrowerController>(GrowerController);
        growerService = module.get<GrowerService>(GrowerService);
    });

    it('Should be defined', () => {                    
        expect(growerController).toBeDefined();
        expect(growerService).toBeDefined();
    }); 

    it('should get a grower item successfully', async () => {        
        const id = "000001";
        const result = await growerController.getById(id);
  
        expect(result).toEqual(JSON.stringify(growerEntityList));
        expect(growerService.getById).toHaveBeenCalledTimes(1);
    });

    it('should get a grower struct successfully', async () => {        
        const result = await growerController.getStruct();

        expect(result).toEqual(JSON.stringify(growerEntityStruct));        
    });

    it('should getAll grower struct successfully', async () => {        
        const result = await growerController.getAll();

        expect(result).toEqual(JSON.stringify(growerAll));        
    });

});