import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaFarmSector, buildStructFarmSector } from './../entities/farmSector.entity';
import { HttpException, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { FarmSector } from '../entities/farmSector.entity';
import { ObjectSchema } from 'realm';
import { IViewRepository } from './IViewRepository.interface';
/* istanbul ignore next */
@Injectable()
export class FarmSectorRepository extends GenericRepository implements IViewRepository {	

	async getById(sectorId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaFarmSector());
			const farmArea = realm.objects<FarmSector>("FarmSector");			
			const results = JSON.stringify(farmArea.filtered(`_id = uuid(${sectorId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaFarmSector());
			const farmArea = realm.objects<FarmSector>("FarmSector");			
			const results = JSON.stringify(farmArea.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructFarmSector();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
