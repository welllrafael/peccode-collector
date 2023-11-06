import { AnimalAgeGroup } from '../../src/entities/animalAgeGroup.entity';
import { AnimalAgeGroupService } from '../../src/service/animalagegroup.service';
import { AnimalAgeGroupController } from '../../src/controller/animalagegroup.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from "bson";
import { BSON, ObjectSchema } from 'realm';

const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");
const animalAgeGroupEntityList: AnimalAgeGroup = {
    _id: idFake,	
    description: "test group",
    productId: 1,
    start: 1,
    end: 1
};

const animalAgeGroupEntityStruct: ObjectSchema = {
	name: 'AnimalAgeGroup',
	properties: {
		_id: 'objectId',
		animalAgeGroupId: 'int',
		description: 'string',
		productId: 'int',
		start: 'int',
		end: 'int'
	},
	primaryKey: '_id'
};

const animalAgeGroup: AnimalAgeGroup[] = [animalAgeGroupEntityList,animalAgeGroupEntityList]

describe('AnimalAgeGroupController', () => {

    let animalAgeGroupController: AnimalAgeGroupController;     
    let animalAgeGroupService: AnimalAgeGroupService;  

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AnimalAgeGroupController],
            providers: [{
                provide: AnimalAgeGroupService,
                useValue: {
                    getById: jest.fn().mockResolvedValue(JSON.stringify(animalAgeGroupEntityList)),
                    getStruct: jest.fn().mockResolvedValue(JSON.stringify(animalAgeGroupEntityStruct)),
                    getAll: jest.fn().mockResolvedValue(JSON.stringify(animalAgeGroup)),                    
                }
            }],
        }).compile();

        animalAgeGroupController = module.get<AnimalAgeGroupController>(AnimalAgeGroupController);
        animalAgeGroupService = module.get<AnimalAgeGroupService>(AnimalAgeGroupService);
    });

    it('Should be defined', () => {                    
        expect(animalAgeGroupController).toBeDefined();
        expect(animalAgeGroupService).toBeDefined();
    }); 

    it('should get a animalagegroup item successfully', async () => {
        const id = "000001";
        const result = await animalAgeGroupController.getById(id);
  
        expect(result).toEqual(JSON.stringify(animalAgeGroupEntityList));
        expect(animalAgeGroupService.getById).toHaveBeenCalledTimes(1);
    });

    it('should get a animalagegroup struct successfully', async () => {
        const result = await animalAgeGroupController.getStruct();

        expect(result).toEqual(JSON.stringify(animalAgeGroupEntityStruct));        
    });
    
    it('should getAll animalagegroup successfully', async () => {
        const result = await animalAgeGroupController.getAll();

        expect(result).toEqual(JSON.stringify(animalAgeGroup));        
    });

});