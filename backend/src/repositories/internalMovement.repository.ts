import { PutInternalMovementDTO, DeleteInternalMovementDTO } from './../dto/internalMovement.dto';
import { IViewRepository } from './IViewRepository.interface';
import { CollectionPecCode } from '../model/collection.model';
import { buildSchemaInternalMovement, buildStructInternalMovement } from '../entities/internalMovement';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InternalMovement } from "../entities/internalMovement";
import { GenericRepository } from './generic.repository';
import { PostInternalMovementDTO } from 'src/dto/internalMovement.dto';
import { BSON } from 'realm';
/* istanbul ignore next */
@Injectable()
export class InternalMovementRepository extends GenericRepository implements IViewRepository {
	async create(inputOperationData: PostInternalMovementDTO): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInternalMovement());
			
			const id: BSON.UUID = new BSON.UUID();

			realm.write(() => {
				const createInternalMovement = realm.create<InternalMovement>("InternalMovement", {
					_id: id,					
					description: inputOperationData.description,
					health: inputOperationData.health,
					weighing: inputOperationData.weighing,
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

	async update(inputOperationData: PutInternalMovementDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInternalMovement());

			const inputOperation = realm.objects<InternalMovement>("InternalMovement");
			const existInternalMovement = inputOperation.filtered(`_id = uuid(${inputOperationData.id})`)[0];			

			if(Boolean(existInternalMovement)) {
				realm.write(() => {												
					existInternalMovement.description = inputOperationData.description,
					existInternalMovement.health = inputOperationData.health,
					existInternalMovement.weighing = inputOperationData.weighing,
					existInternalMovement.createdAt = inputOperationData.createdAt,
					existInternalMovement.updatedAt = inputOperationData.updatedAt,
					existInternalMovement.deletedAt = inputOperationData.deletedAt
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
	async delete(inputOperationData: DeleteInternalMovementDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInternalMovement());

			const inputOperation = realm.objects<InternalMovement>("InternalMovement");
			const existInternalMovement = inputOperation.filtered(`_id = uuid(${inputOperationData.id})`)[0];

			if(Boolean(existInternalMovement)) {
				realm.write(() => {					
					realm.delete(existInternalMovement);									
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
	
	async getById(internalMovementId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInternalMovement());
			const internalMovement = realm.objects<InternalMovement>("InternalMovement");			
			const results = JSON.stringify(internalMovement.filtered(`_id = uuid(${internalMovementId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInternalMovement());
			const internalMovement = realm.objects<InternalMovement>("InternalMovement");			
			const results = JSON.stringify(internalMovement.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructInternalMovement();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
