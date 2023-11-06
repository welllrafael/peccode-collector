import { Breed } from '../../src/entities/breed.entity';
import { BreedService } from '../../src/service/breed.service';
import { BreedController } from '../../src/controller/breed.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from "bson";
import { BSON, ObjectSchema } from 'realm';

const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");
const breedEntityList: Breed = {
    _id: idFake,	
	description: "teste",
	breedTypeId: 1,
	status: 1,
	certifierId: 1
};

const breedEntityStruct: ObjectSchema = {
	name: 'Breed',
	properties: {
		_id: 'objectId',
		breedId: 'int',
		description: 'string',
		breedTypeId: 'int',
		status: 'int',
		certifierId: 'int'		
	},
	primaryKey: '_id'
};

const breedEntity: Breed[] = [breedEntityList,breedEntityList]

describe('BreedController', () => {

    let breedController: BreedController;     
    let breedService: BreedService;  

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BreedController],
            providers: [{
                provide: BreedService,
                useValue: {
                    getById: jest.fn().mockResolvedValue(JSON.stringify(breedEntityList)),
                    getStruct: jest.fn().mockResolvedValue(JSON.stringify(breedEntityStruct)),
                    getAll: jest.fn().mockResolvedValue(JSON.stringify(breedEntity)),                    
                }
            }],
        }).compile();

        breedController = module.get<BreedController>(BreedController);
        breedService = module.get<BreedService>(BreedService);
    });

    it('Should be defined', () => {                    
        expect(breedController).toBeDefined();
        expect(breedService).toBeDefined();
    }); 

    it('should get a breed item successfully', async () => {
        const setRepository = "0";
        const id = "000001";
        const result = await breedController.getById(id, setRepository);
  
        expect(result).toEqual(JSON.stringify(breedEntityList));
        expect(breedService.getById).toHaveBeenCalledTimes(1);
    });

    it('should get a breed struct successfully', async () => {
        const setType = "0";
        const result = await breedController.getStruct(setType);

        expect(result).toEqual(JSON.stringify(breedEntityStruct));        
    });
    
    it('should getAll breed struct successfully', async () => {
        const setType = "0";
        const result = await breedController.getAll(setType);

        expect(result).toEqual(JSON.stringify(breedEntity));        
    });

});