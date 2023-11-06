import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaAnimal, buildStructAnimal } from './../entities/animal.entity';
import { PostAnimalDTO, PutAnimalDTO, DeleteAnimalDTO } from '../dto/animal.dto';
import { sex } from '../entities/animal.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Animal } from "../entities/animal.entity";
import { GenericRepository } from './generic.repository';
import { ObjectSchema, BSON } from 'realm';
import { IRepository } from './IRepository.interface';
/* istanbul ignore next */
@Injectable()
export class AnimalRepository extends GenericRepository implements IRepository {
	async create(animalData: PostAnimalDTO): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimal());
			
			const id: BSON.UUID = new BSON.UUID();
			const breedId: BSON.UUID = new BSON.UUID(animalData.breedId)
			const farmId: BSON.UUID = new BSON.UUID(animalData.farmId)
			const farmGrowerId: BSON.UUID = new BSON.UUID(animalData.farmGrowerId)

			realm.write(() => {
				const createAnimal = realm.create<Animal>("Animal", {
					_id: id,					
					farmId: farmId,
					breedId: breedId, 
					sex:  animalData.sex as sex,
					status: animalData.status, 
					farmGrowerId: farmGrowerId, 
					birthDate: animalData.birthDate,
					inputDate: animalData.inputDate
				});
			  });	
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.CREATED}, "id": "${id}" }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}		
	}

	async update(animalData: PutAnimalDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimal());

			const animal = realm.objects<Animal>("Animal");
			const existAnimal = animal.filtered(`_id = uuid(${animalData.id})`)[0];			

			const breedId: BSON.UUID = new BSON.UUID(animalData.breedId)
			const farmId: BSON.UUID = new BSON.UUID(animalData.farmId)
			const farmGrowerId: BSON.UUID = new BSON.UUID(animalData.farmGrowerId)

			if(Boolean(existAnimal)) {
				realm.write(() => {															
					existAnimal.farmId = farmId,
					existAnimal.breedId = breedId, 
					existAnimal.sex = animalData.sex as sex,
					existAnimal.status = animalData.status, 
					existAnimal.farmGrowerId = farmGrowerId, 
					existAnimal.birthDate = animalData.birthDate,
					existAnimal.inputDate = animalData.inputDate
				});	
			} else {
				super.closeConnectionRealm();
				return `{ code: ${HttpStatus.NOT_FOUND},  message: "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return JSON.stringify(animalData);
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}	
	}
	async delete(animalData: DeleteAnimalDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimal());

			const animal = realm.objects<Animal>("Animal");
			const existAnimal = animal.filtered(`_id = uuid(${animalData.id})`)[0];

			if(Boolean(existAnimal)) {
				realm.write(() => {					
					realm.delete(existAnimal);									
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.OK},  "message": "registro deletado com sucesso". }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getById(animalId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimal());
			const animal = realm.objects<Animal>("Animal");			
			const results = JSON.stringify(animal.filtered(`_id = uuid(${animalId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimal());
			const animal = realm.objects<Animal>("Animal");			
			const results = JSON.stringify(animal.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructAnimal();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
