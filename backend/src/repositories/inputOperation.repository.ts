import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaInputOperation, buildStructInputOperation } from './../entities/inputOperation';
import { PostInputOperationDTO, PutInputOperationDTO, DeleteInputOperationDTO } from '../dto/inputOperation.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InputOperation } from "../entities/inputOperation";
import { GenericRepository } from './generic.repository';
import { IRepository } from './IRepository.interface';
import { BSON } from 'realm';
/* istanbul ignore next */
@Injectable()
export class InputOperationRepository extends GenericRepository implements IRepository {
	async create(inputOperationData: PostInputOperationDTO): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperation());
			
			const id: BSON.UUID = new BSON.UUID();
			const animalInputMovementId: BSON.UUID = new BSON.UUID(inputOperationData.animalInputMovementId);
			const farmGrowerId: BSON.UUID = new BSON.UUID(inputOperationData.farmGrowerId);
			const farmId: BSON.UUID = new BSON.UUID(inputOperationData.farmId);
			const quantity: number = +inputOperationData.quantity;

			realm.write(() => {
				const createInputOperation = realm.create<InputOperation>("InputOperation", {
					_id: id,					
					farmId: farmId,
					animalInputMovementId: animalInputMovementId,
					farmGrowerId: farmGrowerId,
					quantity: quantity,
					obs: inputOperationData.obs,
					operationStatus: inputOperationData.operationStatus,
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

	async update(inputOperationData: PutInputOperationDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperation());

			const inputOperation = realm.objects<InputOperation>("InputOperation");
			const existInputOperation = inputOperation.filtered(`_id = uuid(${inputOperationData.id})`)[0];			

			if(Boolean(existInputOperation)) {
				realm.write(() => {															
					existInputOperation.farmId = inputOperationData.farmId,
					existInputOperation.animalInputMovementId = inputOperationData.animalInputMovementId,
					existInputOperation.farmGrowerId = inputOperationData.farmGrowerId,
					existInputOperation.quantity = inputOperationData.quantity,
					existInputOperation.obs = inputOperationData.obs,
					existInputOperation.operationStatus = inputOperationData.operationStatus,
					existInputOperation.createdAt = inputOperationData.createdAt,
					existInputOperation.updatedAt = inputOperationData.updatedAt,
					existInputOperation.deletedAt = inputOperationData.deletedAt
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
	async delete(inputOperationData: DeleteInputOperationDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperation());

			const inputOperation = realm.objects<InputOperation>("InputOperation");
			const existInputOperation = inputOperation.filtered(`_id = uuid(${inputOperationData.id})`)[0];

			if(Boolean(existInputOperation)) {
				realm.write(() => {					
					realm.delete(existInputOperation);									
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
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperation());
			const inputOperation = realm.objects<InputOperation>("InputOperation");			
			const results = JSON.stringify(inputOperation.filtered(`_id = uuid(${inputOperationId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperation());
			const inputOperation = realm.objects<InputOperation>("InputOperation");			
			const results = JSON.stringify(inputOperation.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructInputOperation();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
