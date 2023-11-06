import { DeleteTraceabilityDTO, PostTraceabilityDTO, PutTraceabilityDTO } from '../../src/dto/traceability.dto';
import { Traceability } from '../../src/entities/traceability.entity';
import { TraceabilityService } from '../../src/service/traceability.service';
import { TraceabilityController } from '../../src/controller/traceability.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from "bson";
import { BSON, ObjectSchema } from 'realm';

const idFake: BSON.UUID = new BSON.UUID("bdcf8f23-9c08-43e8-846d-26aada51612e");
const traceabilityEntityList: Traceability = {
	_id: idFake,
	sisbovNumber: 1, 
	animalId: idFake, 
	farmId: idFake, 
	manejo: 1,
	sisbovDate: new Date(Date.now()),
	solNumber: 1,
	cotaHiltonDate: new Date(Date.now()),
	slaughterReleaseDate: new Date(Date.now()), 
	status: true,
	obs: "Teste de observação"
};

const traceabilityEntityStruct: ObjectSchema = {
	name: 'Traceability',
	properties: {
		_id: 'objectId',
		sisbovNumber: "int", 
		animalId: "string", 
		farmId: "int", 
		manejo: "int",
		sisbovDate: "date", 
		solNumber: "int",
		cotaHiltonDate: "date",
		slaughterReleaseDate: "date", 
		status: "bool", 
		obs: "string"
	},
	primaryKey: '_id'
};

const traceabilityAll: Traceability[] = [traceabilityEntityList, traceabilityEntityList]

const tracePostDto: PostTraceabilityDTO = {
    animalId: idFake,
    farmId: idFake,
    cotaHiltonDate: new Date(),
    manejo: 1,
    obs: "obs fake",
    sisbovDate: new Date(),
    sisbovNumber: 1,
    slaughterReleaseDate: new Date(),
    solNumber: 1,
    status: true
}

const tracePutDto: PutTraceabilityDTO = {
    id: idFake,
    animalId: idFake,
    farmId: idFake,
    cotaHiltonDate: new Date(),
    manejo: 1,
    obs: "obs fake",
    sisbovDate: new Date(),
    sisbovNumber: 1,
    slaughterReleaseDate: new Date(),
    solNumber: 1,
    status: true
}

const traceDelDto: DeleteTraceabilityDTO = {
    id: idFake
}

const fakeTraceCreate = { code: 201, id: "6233aec8ccea79eca50d512e" }
const fakeTraceUpdate = JSON.stringify(traceabilityEntityList)
const fakeTraceDelete = { code: 200, message: "registro deletado com sucesso." }

describe('TraceabilityController', () => {

    let traceabilityController: TraceabilityController;     
    let traceabilityService: TraceabilityService;  

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TraceabilityController],
            providers: [{
                provide: TraceabilityService,
                useValue: {
                    getById: jest.fn().mockResolvedValue(JSON.stringify(traceabilityEntityList)),
                    getStruct: jest.fn().mockResolvedValue(JSON.stringify(traceabilityEntityStruct)),
                    getAll: jest.fn().mockResolvedValue(JSON.stringify(traceabilityAll)),
                    create: jest.fn().mockResolvedValue(JSON.stringify(fakeTraceCreate)),
                    update: jest.fn().mockResolvedValue(JSON.stringify(fakeTraceUpdate)),
                    delete: jest.fn().mockResolvedValue(JSON.stringify(fakeTraceDelete)),
                }
            }],
        }).compile();

        traceabilityController = module.get<TraceabilityController>(TraceabilityController);
        traceabilityService = module.get<TraceabilityService>(TraceabilityService);
    });

    it('Should be defined', () => {                    
        expect(traceabilityController).toBeDefined();
        expect(traceabilityService).toBeDefined();
    }); 

    it('should get a traceability item successfully', async () => {        
        const id = "000001";
        const result = await traceabilityController.getById(id);
  
        expect(result).toEqual(JSON.stringify(traceabilityEntityList));
        expect(traceabilityService.getById).toHaveBeenCalledTimes(1);
    });

    it('should get a traceability struct successfully', async () => {        
        const result = await traceabilityController.getStruct();

        expect(result).toEqual(JSON.stringify(traceabilityEntityStruct));        
    });    

    it('should getAll traceability struct successfully', async () => {        
        const result = await traceabilityController.getAll();

        expect(result).toEqual(JSON.stringify(traceabilityAll));        
    });    

    it('should create traceabilityController successfully', async () => {        
        const result = await traceabilityController.postTraceability(tracePostDto);

        expect(result).toEqual(JSON.stringify(fakeTraceCreate));        
    });

    it('should update traceabilityController successfully', async () => {        
        const result = await traceabilityController.putTraceability(tracePutDto);

        expect(result).toEqual(JSON.stringify(fakeTraceUpdate));        
    });

    it('should delete traceabilityController successfully', async () => {        
        const result = await traceabilityController.deleteTraceability(traceDelDto);

        expect(result).toEqual(JSON.stringify(fakeTraceDelete));        
    });


});