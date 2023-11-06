import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaInputOperationAnimal, buildStructInputOperationAnimal } from './../entities/inputOperationAnimal';
import { InputOperationAnimal } from '../entities/inputOperationAnimal';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { ObjectSchema, BSON } from 'realm';
import { IRepository } from './IRepository.interface';
import { DeleteInputOperationAnimalDTO, PostInputOperationAnimalDTO, PutInputOperationAnimalDTO } from '../dto/inputOperationAnimal.dto';
/* istanbul ignore next */
@Injectable()
export class InputOperationAnimalRepository extends GenericRepository implements IRepository {
	async create(inputOperationAnimalData: PostInputOperationAnimalDTO): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationAnimal());
			
			const id: BSON.UUID = new BSON.UUID();
			const inputOperationId: BSON.UUID = new BSON.UUID(inputOperationAnimalData.inputOperationId);
			const animalId: BSON.UUID = new BSON.UUID(inputOperationAnimalData.animalId);
			const inputGtaId: BSON.UUID = new BSON.UUID(inputOperationAnimalData.inputGtaId);

			realm.write(() => {
				const createInputOperation = realm.create<InputOperationAnimal>("InputOperationAnimal", {
					_id: id,					
					inputOperationId: inputOperationId,
					animalId: animalId,
					aside: inputOperationAnimalData.aside,
					inputGtaId: inputGtaId,
					createdAt: inputOperationAnimalData.createdAt,
					updatedAt: inputOperationAnimalData.updatedAt,
					deletedAt: inputOperationAnimalData.deletedAt
				});
			  });	
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.CREATED}, "id": "${id}" }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}		
	}

	async update(inputOperationAnimalData: PutInputOperationAnimalDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationAnimal());

			const inputOperation = realm.objects<InputOperationAnimal>("InputOperationAnimal");
			const existInputOperationAnimal = inputOperation.filtered(`_id = uuid(${inputOperationAnimalData.id})`)[0];			

			const inputOperationId: BSON.UUID = new BSON.UUID(inputOperationAnimalData.inputOperationId);
			const animalId: BSON.UUID = new BSON.UUID(inputOperationAnimalData.animalId);
			const inputGtaId: BSON.UUID = new BSON.UUID(inputOperationAnimalData.inputGtaId);

			if(Boolean(existInputOperationAnimal)) {
				realm.write(() => {															
					existInputOperationAnimal.inputOperationId = inputOperationId,
					existInputOperationAnimal.animalId = animalId,
					existInputOperationAnimal.aside = inputOperationAnimalData.aside,
					existInputOperationAnimal.inputGtaId = inputGtaId,
					existInputOperationAnimal.createdAt = inputOperationAnimalData.createdAt,
					existInputOperationAnimal.updatedAt = inputOperationAnimalData.updatedAt,
					existInputOperationAnimal.deletedAt = inputOperationAnimalData.deletedAt
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return JSON.stringify(inputOperationAnimalData);
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}	
	}
	async delete(delOperationAnimalData: DeleteInputOperationAnimalDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationAnimal());

			const inputOperationAnimal = realm.objects<InputOperationAnimal>("InputOperationAnimal");
			const existInputOperationAnimal = inputOperationAnimal.filtered(`_id = uuid(${delOperationAnimalData.id})`)[0];

			if(Boolean(existInputOperationAnimal)) {
				realm.write(() => {					
					realm.delete(existInputOperationAnimal);									
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

	async getById(inputOperationId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationAnimal());
			const inputOperation = realm.objects<InputOperationAnimal>("InputOperationAnimal");			
			const results = JSON.stringify(inputOperation.filtered(`_id = uuid(${inputOperationId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationAnimal());
			const inputOperation = realm.objects<InputOperationAnimal>("InputOperationAnimal");			
			const results = JSON.stringify(inputOperation.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructInputOperationAnimal();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
