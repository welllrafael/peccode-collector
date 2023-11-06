import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaAnimalCurrentData, buildStructAnimalCurrentData } from './../entities/animalCurrentData.entity';
import { DeleteAnimalCurrentDataDTO, PostAnimalCurrentDataDTO, PutAnimalCurrentDataDTO } from '../dto/animalCurrentData.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AnimalCurrentData } from "../entities/animalCurrentData.entity";
import { GenericRepository } from './generic.repository';
import { BSON, ObjectSchema } from 'realm';
import { IRepository } from './IRepository.interface';
/* istanbul ignore next */
@Injectable()
export class AnimalCurrentDataRepository extends GenericRepository implements IRepository {
	async create(animalData: PostAnimalCurrentDataDTO): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimalCurrentData());
			
			const id: BSON.UUID = new BSON.UUID();
			const animalId: BSON.UUID = new BSON.UUID(animalData.animalId)
			const farmId: BSON.UUID = new BSON.UUID(animalData.farmId)
			const areaId: BSON.UUID = new BSON.UUID(animalData.areaId)
			const lotId: BSON.UUID = new BSON.UUID(animalData.lotId)

			realm.write(() => {
				const createAnimal = realm.create<AnimalCurrentData>("AnimalCurrentData", {
					_id: id,					
					animalId: animalId,
					farmId: farmId,
					areaId: areaId, 
					areaDate: animalData.areaDate, 
					picketId: animalData.picketId,
					picketDate: animalData.picketDate, 
					lotId: lotId,
					lotDate: animalData.lotDate, 
					weight: animalData.weight,
					weightingDate: animalData.weightingDate, 
					healthProtocolId: animalData.healthProtocolId, 
					healthProtocolDate: animalData.healthProtocolDate, 
					quarantineDate: animalData.quarantineDate
				});
			  });	
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.CREATED}, id: "${id}" }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}		
	}

	async update(animalData: PutAnimalCurrentDataDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimalCurrentData());

			const ide = realm.objects<AnimalCurrentData>("AnimalCurrentData");
			const existAnimal = ide.filtered(`_id = uuid(${animalData.id})`)[0];			

			const animalId: BSON.UUID = new BSON.UUID(animalData.animalId)
			const farmId: BSON.UUID = new BSON.UUID(animalData.farmId)
			const areaId: BSON.UUID = new BSON.UUID(animalData.areaId)
			const lotId: BSON.UUID = new BSON.UUID(animalData.lotId)

			if(Boolean(existAnimal)) {
				realm.write(() => {															
					existAnimal.animalId = animalId,
					existAnimal.farmId = farmId,
					existAnimal.areaId = areaId, 
					existAnimal.areaDate = animalData.areaDate, 
					existAnimal.picketId = animalData.picketId,
					existAnimal.picketDate = animalData.picketDate, 
					existAnimal.lotId = lotId,
					existAnimal.lotDate = animalData.lotDate, 
					existAnimal.weight = animalData.weight,
					existAnimal.weightingDate = animalData.weightingDate, 
					existAnimal.healthProtocolId = animalData.healthProtocolId, 
					existAnimal.healthProtocolDate = animalData.healthProtocolDate, 
					existAnimal.quarantineDate = animalData.quarantineDate
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return JSON.stringify(animalData);
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}	
	}
	async delete(animalData: DeleteAnimalCurrentDataDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimalCurrentData());

			const ide = realm.objects<AnimalCurrentData>("AnimalCurrentData");
			const existAnimal = ide.filtered(`_id = uuid(${animalData.id})`)[0];

			if(Boolean(existAnimal)) {
				realm.write(() => {					
					realm.delete(existAnimal);									
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.OK},  "message": "registro deletado com sucesso." }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getById(animalCurrentDataId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimalCurrentData());
			const animalCurrentData = realm.objects<AnimalCurrentData>("AnimalCurrentData");			
			const results = JSON.stringify(animalCurrentData.filtered(`_id = uuid(${animalCurrentDataId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimalCurrentData());
			const animalCurrentData = realm.objects<AnimalCurrentData>("AnimalCurrentData");			
			const results = JSON.stringify(animalCurrentData.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructAnimalCurrentData();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
