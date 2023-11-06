import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaFarmLot, buildStructFarmLot } from './../entities/farmLot.entity';
import { HttpException, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { FarmLot } from '../entities/farmLot.entity';
import { ObjectSchema } from 'realm';
import { IViewRepository } from './IViewRepository.interface';
/* istanbul ignore next */
@Injectable()
export class FarmLotRepository extends GenericRepository implements IViewRepository {	

	async getById(lotId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaFarmLot());
			const farmArea = realm.objects<FarmLot>("FarmLot");			
			const results = JSON.stringify(farmArea.filtered(`_id = uuid(${lotId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaFarmLot());
			const farmArea = realm.objects<FarmLot>("FarmLot");			
			const results = JSON.stringify(farmArea.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructFarmLot();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
