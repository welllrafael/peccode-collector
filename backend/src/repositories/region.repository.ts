import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaRegion, buildStructRegion } from './../entities/region.entity';
import { IAddressRepository } from './IAddressRepository.interface';
import { ObjectSchema } from 'realm';
import { HttpException, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { Region } from '../entities/region.entity';
/* istanbul ignore next */ 
@Injectable()
export class RegionRepository extends GenericRepository implements IAddressRepository {

	async getData(Request: string): Promise<string> {
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaRegion());
			const region = realm.objects<Region>("Region");			
			const results = JSON.stringify(region.filtered(`_id = uuid(${Request})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaRegion());
			const region = realm.objects<Region>("Region");			
			const results = JSON.stringify(region.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		try {
			return buildStructRegion();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}