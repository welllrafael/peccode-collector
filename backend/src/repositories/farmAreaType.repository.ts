import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaFarmAreaType, buildStructFarmAreaType } from './../entities/farmAreaType.entity';
import { FarmAreaType } from '../entities/farmAreaType.entity';
import { HttpException, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { ObjectSchema } from 'realm';
import { IViewRepository } from './IViewRepository.interface';
/* istanbul ignore next */
@Injectable()
export class FarmAreaTypeRepository extends GenericRepository implements IViewRepository {	
	
	async getById(farmAreaTypeId: string): Promise<string> {
		
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaFarmAreaType());
			const farmArea = realm.objects<FarmAreaType>("FarmAreaType");			
			const results = JSON.stringify(farmArea.filtered(`_id = uuid(${farmAreaTypeId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaFarmAreaType());
			const farmArea = realm.objects<FarmAreaType>("FarmAreaType");			
			const results = JSON.stringify(farmArea.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructFarmAreaType();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
