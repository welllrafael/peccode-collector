import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaGrower, buildStructGrower } from './../entities/grower.entity';
import { HttpException, Injectable } from "@nestjs/common";
import { Grower } from "../entities/grower.entity";
import { GenericRepository } from './generic.repository';
import { IViewRepository } from './IViewRepository.interface';
/* istanbul ignore next */
@Injectable()
export class GrowerRepository extends GenericRepository implements IViewRepository {
	
	async getAll(): Promise<string> {
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaGrower());
			const grower = realm.objects<Grower>("Grower");			
			const results = JSON.stringify(grower.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}	

	async getById(growerId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaGrower());
			const grower = realm.objects<Grower>("Grower");			
			const results = JSON.stringify(grower.filtered(`_id = uuid(${growerId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructGrower();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
