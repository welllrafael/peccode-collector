import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaFarmArea, buildStructFarmArea } from './../entities/farmArea.entity';
import { HttpException, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { FarmArea } from '../entities/farmArea.entity';
import { ObjectSchema } from 'realm';
import { IViewRepository } from './IViewRepository.interface';
/* istanbul ignore next */
@Injectable()
export class FarmAreaRepository extends GenericRepository implements IViewRepository {	

	async getById(areaId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaFarmArea());
			const farmArea = realm.objects<FarmArea>("FarmArea");			
			const results = JSON.stringify(farmArea.filtered(`_id = uuid(${areaId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaFarmArea());
			const farmArea = realm.objects<FarmArea>("FarmArea");			
			const results = JSON.stringify(farmArea.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructFarmArea();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
