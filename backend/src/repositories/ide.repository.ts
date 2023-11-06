import { buildStructIde } from './../entities/ide.entity';
import { CollectionPecCode } from './../model/collection.model';
import { PostIdeDTO, PutIdeDTO, DeleteIdeDTO } from '../dto/ide.dto';
import { buildSchemaIde } from '../entities/ide.entity';
import { BSON, ObjectSchema } from 'realm';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Ide } from "../entities/ide.entity";
import { GenericRepository } from './generic.repository';
import { IRepository } from './IRepository.interface';
/* istanbul ignore next */
@Injectable()
export class IdeRepository extends GenericRepository implements IRepository {
	async create(ideData: PostIdeDTO): Promise<string> {
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaIde());
			const id: BSON.UUID = new BSON.UUID();
			const animalId: BSON.UUID = new BSON.UUID(ideData.animalId)

			realm.write(() => {
				const createIde = realm.create<Ide>("Ide", {
					_id: id,					
					animalId: animalId,
					status: ideData.status
				});
			  });	
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.CREATED},  "id": "${id}" }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}		
	}

	async update(ideData: PutIdeDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaIde());

			const ide = realm.objects<Ide>("Ide");
			const existIde = ide.filtered(`_id = uuid(${ideData.id})`)[0];		
			const animalId: BSON.UUID = new BSON.UUID(ideData.animalId)	

			if(Boolean(existIde)) {
				realm.write(() => {					
					existIde.animalId = animalId,
					existIde.status = ideData.status
				});	
			} else {
				super.closeConnectionRealm();
				return `{ code: ${HttpStatus.NOT_FOUND},  message: "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return JSON.stringify(ideData);
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}	
	}
	async delete(ideData: DeleteIdeDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaIde());

			const ide = realm.objects<Ide>("Ide");
			const existIde = ide.filtered(`_id = uuid(${ideData.id})`)[0];

			if(Boolean(existIde)) {
				realm.write(() => {					
					realm.delete(existIde);									
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
	
	async getById(ideId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaIde());
			const ide = realm.objects<Ide>("Ide");			
			const results = JSON.stringify(ide.filtered(`_id = uuid(${ideId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaIde());
			const ide = realm.objects<Ide>("Ide");			
			const results = JSON.stringify(ide.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructIde();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
