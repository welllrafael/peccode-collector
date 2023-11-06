import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaInputMovement, buildStructInputMovement } from './../entities/inputMovement';
import { PostInputMovementDTO, PutInputMovementDTO, DeleteInputMovementDTO } from '../dto/inputMovement.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InputMovement } from "../entities/inputMovement";
import { GenericRepository } from './generic.repository';
import { IRepository } from './IRepository.interface';
import { BSON } from 'realm';
/* istanbul ignore next */
@Injectable()
export class InputMovementRepository extends GenericRepository implements IRepository {
	async create(inputOperationData: PostInputMovementDTO): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputMovement());
			
			const id: BSON.UUID = new BSON.UUID();

			realm.write(() => {
				const createInputMovement = realm.create<InputMovement>("InputMovement", {
					_id: id,					
					description: inputOperationData.description,
					identification: inputOperationData.identification,
					registration: inputOperationData.registration,
					health: inputOperationData.health,
					weighing: inputOperationData.weighing,
					gta: inputOperationData.gta,
					ageGroup: inputOperationData.ageGroup,
					createdAt: inputOperationData.createdAt,
					updatedAt: inputOperationData.updatedAt,
					deletedAt: inputOperationData.deletedAt
				});
			  });	
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.CREATED}, "id": "${id}" }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}		
	}

	async update(inputOperationData: PutInputMovementDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputMovement());

			const inputOperation = realm.objects<InputMovement>("InputMovement");
			const existInputMovement = inputOperation.filtered(`_id = uuid(${inputOperationData.id})`)[0];			

			if(Boolean(existInputMovement)) {
				realm.write(() => {												

					existInputMovement.description = inputOperationData.description,
					existInputMovement.identification = inputOperationData.identification,
					existInputMovement.registration = inputOperationData.registration,
					existInputMovement.health = inputOperationData.health,
					existInputMovement.weighing = inputOperationData.weighing,
					existInputMovement.gta = inputOperationData.gta,
					existInputMovement.ageGroup = inputOperationData.ageGroup,
					existInputMovement.createdAt = inputOperationData.createdAt,
					existInputMovement.updatedAt = inputOperationData.updatedAt,
					existInputMovement.deletedAt = inputOperationData.deletedAt
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return JSON.stringify(inputOperationData);
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}	
	}
	async delete(inputOperationData: DeleteInputMovementDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputMovement());

			const inputOperation = realm.objects<InputMovement>("InputMovement");
			const existInputMovement = inputOperation.filtered(`_id = uuid(${inputOperationData.id})`)[0];

			if(Boolean(existInputMovement)) {
				realm.write(() => {					
					realm.delete(existInputMovement);									
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
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputMovement());
			const inputOperation = realm.objects<InputMovement>("InputMovement");			
			const results = JSON.stringify(inputOperation.filtered(`_id = uuid(${inputOperationId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputMovement());
			const inputOperation = realm.objects<InputMovement>("InputMovement");			
			const results = JSON.stringify(inputOperation.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructInputMovement();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
