import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaFarm, buildStructFarm } from './../entities/farm.entity';
import { ObjectSchema } from 'realm';
import { HttpException, Injectable } from "@nestjs/common";
import { Farm } from "../entities/farm.entity"
import { GenericRepository } from './generic.repository';
import { IViewRepository } from './IViewRepository.interface';
/* istanbul ignore next */ 
@Injectable()
export class FarmRepository extends GenericRepository implements IViewRepository {

	async getById(farmData: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaFarm());
			const farm = realm.objects<Farm>("Farm");			
			const results = JSON.stringify(farm.filtered(`_id = uuid(${farmData})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaFarm());
			const farm = realm.objects<Farm>("Farm");			
			const results = JSON.stringify(farm.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructFarm();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}