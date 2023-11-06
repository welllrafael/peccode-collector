import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaInputOperationHealthProtocol, buildStructInputOperationHealthProtocol } from './../entities/InputOperationHealthProtocol';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { ObjectSchema, BSON } from 'realm';
import { IRepository } from './IRepository.interface';
import { InputOperationHealthProtocol } from '../entities/InputOperationHealthProtocol';
import { DeleteInputOperationHealthProtocolDTO, PostInputOperationHealthProtocolDTO, PutInputOperationHealthProtocolDTO } from "../dto/inputOperationHealthProtocol.dto";
/* istanbul ignore next */
@Injectable()
export class InputOperationHealthProtocolRepository extends GenericRepository implements IRepository {
	async create(inputOperationHealthProtocolData: PostInputOperationHealthProtocolDTO): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationHealthProtocol());
			
			const id: BSON.UUID = new BSON.UUID();
			const inputOperationId: BSON.UUID = new BSON.UUID(inputOperationHealthProtocolData.inputOperationId);

			realm.write(() => {
				const createInputOperation = realm.create<InputOperationHealthProtocol>("InputOperationHealthProtocol", {
					_id: id,					
					inputOperationId: inputOperationId,
					healthProtocolId: inputOperationHealthProtocolData.healthProtocolId,
					aside: inputOperationHealthProtocolData.aside,
					createdAt: inputOperationHealthProtocolData.createdAt,
					updatedAt: inputOperationHealthProtocolData.updatedAt,
					deletedAt: inputOperationHealthProtocolData.deletedAt
				});
			  });	
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.CREATED}, "id": "${id}" }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}		
	}

	async update(inputOperationHealthProtocolData: PutInputOperationHealthProtocolDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationHealthProtocol());

			const inputOperation = realm.objects<InputOperationHealthProtocol>("InputOperationHealthProtocol");
			const existInputOperationHealth = inputOperation.filtered(`_id = uuid(${inputOperationHealthProtocolData.id})`)[0];			
			const inputOperationId: BSON.UUID = new BSON.UUID(existInputOperationHealth.inputOperationId);

			if(Boolean(existInputOperationHealth)) {
				realm.write(() => {															
					existInputOperationHealth.inputOperationId = inputOperationId,
					existInputOperationHealth.healthProtocolId = inputOperationHealthProtocolData.healthProtocolId,
					existInputOperationHealth.aside = inputOperationHealthProtocolData.aside,
					existInputOperationHealth.createdAt =  inputOperationHealthProtocolData.createdAt,
					existInputOperationHealth.updatedAt = inputOperationHealthProtocolData.updatedAt,
					existInputOperationHealth.deletedAt = inputOperationHealthProtocolData.deletedAt
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return JSON.stringify(inputOperationHealthProtocolData);
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}	
	}
	async delete(delOperationHealth: DeleteInputOperationHealthProtocolDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationHealthProtocol());

			const inputOperationAnimal = realm.objects<InputOperationHealthProtocol>("InputOperationHealthProtocol");
			const existInputOperationHealth = inputOperationAnimal.filtered(`_id = uuid(${delOperationHealth.id})`)[0];

			if(Boolean(existInputOperationHealth)) {
				realm.write(() => {					
					realm.delete(existInputOperationHealth);									
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
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationHealthProtocol());
			const inputOperation = realm.objects<InputOperationHealthProtocol>("InputOperationHealthProtocol");			
			const results = JSON.stringify(inputOperation.filtered(`_id = uuid(${inputOperationId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationHealthProtocol());
			const inputOperation = realm.objects<InputOperationHealthProtocol>("InputOperationHealthProtocol");			
			const results = JSON.stringify(inputOperation.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructInputOperationHealthProtocol();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
