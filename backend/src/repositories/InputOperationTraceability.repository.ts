import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaInputOperationTraceability, buildStructInputOperationTraceability } from './../entities/InputOperationTraceability';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { ObjectSchema, BSON } from 'realm';
import { IRepository } from './IRepository.interface';
import { InputOperationTraceability } from '../entities/InputOperationTraceability';
import { DeleteInputOperationTraceabilityDTO, PostInputOperationTraceabilityDTO, PutInputOperationTraceabilityDTO } from '../dto/inputOperationTraceability.dto';
/* istanbul ignore next */
@Injectable()
export class InputOperationTraceabilityRepository extends GenericRepository implements IRepository {
	async create(inputOperationTraceabilityData: PostInputOperationTraceabilityDTO): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationTraceability());
			
			const id: BSON.UUID = new BSON.UUID();
			const inputOperationId: BSON.UUID = new BSON.UUID(inputOperationTraceabilityData.inputOperationId);

			realm.write(() => {
				const createInputOperation = realm.create<InputOperationTraceability>("InputOperationTraceability", {
					_id: id,					
					inputOperationId: inputOperationId,
					status: inputOperationTraceabilityData.status,
					protocol: inputOperationTraceabilityData.protocol,
					message: inputOperationTraceabilityData.message,
					createdAt: inputOperationTraceabilityData.createdAt,
					updatedAt: inputOperationTraceabilityData.updatedAt,
					deletedAt: inputOperationTraceabilityData.deletedAt
				});
			  });	
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.CREATED}, "id": "${id}" }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}		
	}

	async update(inputOperationTraceabilityData: PutInputOperationTraceabilityDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationTraceability());

			const inputOperation = realm.objects<InputOperationTraceability>("InputOperationTraceability");
			const existInputOperationTraceability = inputOperation.filtered(`_id = uuid(${inputOperationTraceabilityData.id})`)[0];	
			
			const inputOperationId: BSON.UUID = new BSON.UUID(inputOperationTraceabilityData.inputOperationId);

			if(Boolean(existInputOperationTraceability)) {
				realm.write(() => {															
					existInputOperationTraceability.inputOperationId = inputOperationId,
					existInputOperationTraceability.status = inputOperationTraceabilityData.status,
					existInputOperationTraceability.protocol = inputOperationTraceabilityData.protocol,
					existInputOperationTraceability.message = inputOperationTraceabilityData.message,
					existInputOperationTraceability.createdAt = inputOperationTraceabilityData.createdAt,
					existInputOperationTraceability.updatedAt = inputOperationTraceabilityData.updatedAt,
					existInputOperationTraceability.deletedAt = inputOperationTraceabilityData.deletedAt
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return JSON.stringify(inputOperationTraceabilityData);
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}	
	}
	async delete(delOperationTraceabilityData: DeleteInputOperationTraceabilityDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationTraceability());

			const inputOperationAnimal = realm.objects<InputOperationTraceability>("InputOperationTraceability");
			const existInputOperationTraceability = inputOperationAnimal.filtered(`_id = uuid(${delOperationTraceabilityData.id})`)[0];

			if(Boolean(existInputOperationTraceability)) {
				realm.write(() => {					
					realm.delete(existInputOperationTraceability);									
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

	async getById(inputOperationId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationTraceability());
			const inputOperation = realm.objects<InputOperationTraceability>("InputOperationTraceability");			
			const results = JSON.stringify(inputOperation.filtered(`_id = uuid(${inputOperationId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationTraceability());
			const inputOperation = realm.objects<InputOperationTraceability>("InputOperationTraceability");			
			const results = JSON.stringify(inputOperation.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructInputOperationTraceability();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
