import { PostMovementTypeDTO, PutMovementTypeDTO, DeleteMovementTypeDTO } from './../dto/movementType.dto';
import { IViewRepository } from './IViewRepository.interface';
import { CollectionPecCode } from '../model/collection.model';
import { buildSchemaMovementType, buildStructMovementType, MovementTypeEnum } from '../entities/movementType';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MovementType } from "../entities/movementType";
import { GenericRepository } from './generic.repository';
import { BSON } from 'realm';
/* istanbul ignore next */
@Injectable()
export class MovementTypeRepository extends GenericRepository implements IViewRepository {
	async create(inputOperationData: PostMovementTypeDTO): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaMovementType());
			
			const id: BSON.UUID = new BSON.UUID();

			realm.write(() => {
				const createMovementType = realm.create<MovementType>("MovementType", {
					_id: id,					
					description: inputOperationData.description,
					type: inputOperationData.type as MovementTypeEnum,
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

	async update(inputOperationData: PutMovementTypeDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaMovementType());

			const inputOperation = realm.objects<MovementType>("MovementType");
			const existMovementType = inputOperation.filtered(`_id = uuid(${inputOperationData.id})`)[0];			

			if(Boolean(existMovementType)) {
				realm.write(() => {												
					existMovementType.description = inputOperationData.description,
					existMovementType.type = inputOperationData.type as MovementTypeEnum,
					existMovementType.ageGroup = inputOperationData.ageGroup,
					existMovementType.createdAt = inputOperationData.createdAt,
					existMovementType.updatedAt = inputOperationData.updatedAt,
					existMovementType.deletedAt = inputOperationData.deletedAt
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
	async delete(inputOperationData: DeleteMovementTypeDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaMovementType());

			const inputOperation = realm.objects<MovementType>("MovementType");
			const existMovementType = inputOperation.filtered(`_id = uuid(${inputOperationData.id})`)[0];

			if(Boolean(existMovementType)) {
				realm.write(() => {					
					realm.delete(existMovementType);									
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
	
	async getById(movementTypeId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaMovementType());
			const movementType = realm.objects<MovementType>("MovementType");			
			const results = JSON.stringify(movementType.filtered(`_id = uuid(${movementTypeId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaMovementType());
			const movementType = realm.objects<MovementType>("MovementType");			
			const results = JSON.stringify(movementType.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructMovementType();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
