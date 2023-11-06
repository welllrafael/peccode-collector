import { buildStructFarmLot } from './../entities/farmLot.entity';
import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaFarmLotType } from './../entities/farmLotType.entity';
import { HttpException, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { FarmLotType } from '../entities/farmLotType.entity';
import { ObjectSchema } from 'realm';
import { IViewRepository } from './IViewRepository.interface';
/* istanbul ignore next */
@Injectable()
export class FarmLotTypeRepository extends GenericRepository implements IViewRepository {	

	async getById(lotTypeId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaFarmLotType());
			const farmArea = realm.objects<FarmLotType>("FarmLotType");			
			const results = JSON.stringify(farmArea.filtered(`_id = uuid(${lotTypeId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaFarmLotType());
			const farmArea = realm.objects<FarmLotType>("FarmLotType");			
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
