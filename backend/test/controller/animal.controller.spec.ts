import { AnimalGenericDTO } from '../../src/dto/AnimalGeneric.dto';
import { Animal, sex } from '../../src/entities/animal.entity';
import { AnimalService } from '../../src/service/animal.service';
import { AnimalController } from '../../src/controller/animal.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from "bson";
import { BSON, ObjectSchema } from 'realm';

const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");
const animalEntityList: Animal = {
    _id: idFake,	
	farmId: idFake,
	breedId: idFake,
	sex: sex.Masculino,
	status: true,
	farmGrowerId: idFake,
	birthDate: new Date(Date.now()), 
	inputDate: new Date(Date.now())
};

const animalEntityStruct: ObjectSchema = {
	name: 'Animal',
	properties: {
		_id: 'objectId',
		animalId: 'string',
		farmId: 'int',
		breedId: 'int',
		sex: 'string',
		status: 'bool',
		farmGrowerId: 'int',
		birthDate: 'date',
		inputDate: 'date'		
	},
	primaryKey: '_id'
};

const animalAll: Animal[] = [
    animalEntityList,
    animalEntityList
]

const animalDTO: AnimalGenericDTO = {
    id: idFake
}

const fakeAnimalCreate = { code: 201, id: "6233aec8ccea79eca50d512e" }

const fakeAnimalUpdate = JSON.stringify(animalEntityList)

const fakeAnimalDelete = { code: 201, id: "registro deletado com sucesso" }

describe('AnimalController', () => {

    let animalController: AnimalController;     
    let animalService: AnimalService;  

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AnimalController],
            providers: [{
                provide: AnimalService,
                useValue: {
                    getById: jest.fn().mockResolvedValue(JSON.stringify(animalEntityList)),
                    getStruct: jest.fn().mockResolvedValue(JSON.stringify(animalEntityStruct)),
                    getAll: jest.fn().mockResolvedValue(JSON.stringify(animalAll)),
                    create: jest.fn().mockResolvedValue(JSON.stringify(fakeAnimalCreate)),
                    update: jest.fn().mockResolvedValue(JSON.stringify(fakeAnimalUpdate)),
                    delete: jest.fn().mockResolvedValue(JSON.stringify(fakeAnimalDelete))
                }
            }],
        }).compile();

        animalController = module.get<AnimalController>(AnimalController);
        animalService = module.get<AnimalService>(AnimalService);
    });

    it('Should be defined', () => {                    
        expect(animalController).toBeDefined();
        expect(animalService).toBeDefined();
    }); 

    it('should get a animal item successfully', async () => {
        const setRepository = "0";
        const id = "000001";
        const result = await animalController.getById(id, setRepository);
  
        expect(result).toEqual(JSON.stringify(animalEntityList));
        expect(animalService.getById).toHaveBeenCalledTimes(1);
    });

    it('should get a animal struct successfully', async () => {
        const setType = "0";
        const result = await animalController.getStruct(setType);

        expect(result).toEqual(JSON.stringify(animalEntityStruct));        
    });

    it('should getAll animal successfully', async () => {
        const setType = "0";
        const result = await animalController.getAll(setType);

        expect(result).toEqual(JSON.stringify(animalAll));        
    });

    it('should create animal successfully', async () => {
        const setType = "0";
        const result = await animalController.postAnimal(animalDTO,setType);

        expect(result).toEqual(JSON.stringify(fakeAnimalCreate));        
    });

    it('should update animal successfully', async () => {
        const setType = "0";
        const result = await animalController.putAnimal(animalDTO,setType);

        expect(result).toEqual(JSON.stringify(fakeAnimalUpdate));        
    });

    it('should delete animal successfully', async () => {
        const setType = "0";
        const result = await animalController.deleteAnimal(animalDTO,setType);

        expect(result).toEqual(JSON.stringify(fakeAnimalDelete));        
    });
});