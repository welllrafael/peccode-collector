import { IViewRepository } from './IViewRepository.interface';
import { CollectionPecCode } from '../model/collection.model';
import { buildSchemaOutputMovement, buildStructOutputMovement } from '../entities/outputMovement';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { OutputMovement } from "../entities/outputMovement";
import { GenericRepository } from './generic.repository';
import { BSON } from 'realm';
import { DeleteOutputMovementDTO, PostOutputMovementDTO, PutOutputMovementDTO } from 'src/dto/outputMovement.dto';
/* istanbul ignore next */
@Injectable()
export class OutputMovementRepository extends GenericRepository implements IViewRepository {
	async create(inputOperationData: PostOutputMovementDTO): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaOutputMovement());
			
			const id: BSON.UUID = new BSON.UUID();

			realm.write(() => {
				const createOutputMovement = realm.create<OutputMovement>("OutputMovement", {
					_id: id,					
					description: inputOperationData.description,
					ageGroup: inputOperationData.ageGroup,
					gta: inputOperationData.gta,
					exportSale: inputOperationData.exportSale,
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

	async update(inputOperationData: PutOutputMovementDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaOutputMovement());

			const inputOperation = realm.objects<OutputMovement>("OutputMovement");
			const existOutputMovement = inputOperation.filtered(`_id = uuid(${inputOperationData.id})`)[0];			

			if(Boolean(existOutputMovement)) {
				realm.write(() => {												
					existOutputMovement.description = inputOperationData.description,
					existOutputMovement.ageGroup = inputOperationData.ageGroup,
					existOutputMovement.gta = inputOperationData.gta,
					existOutputMovement.exportSale = inputOperationData.exportSale,
					existOutputMovement.weighing = inputOperationData.weighing,
					existOutputMovement.createdAt = inputOperationData.createdAt,
					existOutputMovement.updatedAt = inputOperationData.updatedAt,
					existOutputMovement.deletedAt = inputOperationData.deletedAt
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
	async delete(inputOperationData: DeleteOutputMovementDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaOutputMovement());

			const inputOperation = realm.objects<OutputMovement>("OutputMovement");
			const existOutputMovement = inputOperation.filtered(`_id = uuid(${inputOperationData.id})`)[0];

			if(Boolean(existOutputMovement)) {
				realm.write(() => {					
					realm.delete(existOutputMovement);									
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
	
	async getById(outputMovementId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaOutputMovement());
			const outputMovement = realm.objects<OutputMovement>("OutputMovement");			
			const results = JSON.stringify(outputMovement.filtered(`_id = uuid(${outputMovementId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaOutputMovement());
			const outputMovement = realm.objects<OutputMovement>("OutputMovement");			
			const results = JSON.stringify(outputMovement.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructOutputMovement();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
