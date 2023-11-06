import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaIdv, buildStructIdv } from './../entities/idv.entity';
import { PostIdvDTO, PutIdvDTO, DeleteIdvDTO } from '../dto/idv.dto';
import { BSON, ObjectSchema } from 'realm';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Idv } from "../entities/idv.entity";
import { GenericRepository } from './generic.repository';
import { IRepository } from './IRepository.interface';
/* istanbul ignore next */
@Injectable()
export class IdvRepository extends GenericRepository implements IRepository {
	async create(idvData: PostIdvDTO): Promise<string> {
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaIdv());
			const id: BSON.UUID = new BSON.UUID();
			const animalId: BSON.UUID = new BSON.UUID(idvData.animalId)

			realm.write(() => {
				const createIdv = realm.create<Idv>("Idv", {
					_id: id,
					animalId: animalId,
					status: idvData.status
				});
			  });	
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.CREATED},  "id": "${id}" }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}		
	}

	async update(idvData: PutIdvDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaIdv());

			const idv = realm.objects<Idv>("Idv");
			const existIdv = idv.filtered(`_id = uuid(${idvData.id})`)[0];
			const animalId: BSON.UUID = new BSON.UUID(idvData.animalId)

			if(Boolean(existIdv)) {
				realm.write(() => {					
					existIdv.animalId = animalId,
					existIdv.status = idvData.status
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return JSON.stringify(idvData);
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}	
	}
	async delete(idvData: DeleteIdvDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaIdv());

			const idv = realm.objects<Idv>("Idv");
			const existIdv = idv.filtered(`_id = uuid(${idvData.id})`)[0];

			if(Boolean(existIdv)) {
				realm.write(() => {					
					realm.delete(existIdv);									
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

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaIdv());
			const idv = realm.objects<Idv>("Idv");			
			const results = JSON.stringify(idv.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getById(idvId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaIdv());
			const idv = realm.objects<Idv>("Idv");			
			const results = JSON.stringify(idv.filtered(`_id = uuid(${idvId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructIdv();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	
	}
}
