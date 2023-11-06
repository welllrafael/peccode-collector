import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaCounty, buildStructCounty } from './../entities/county.entity';
import { IAddressRepository } from './IAddressRepository.interface';
import { HttpException, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { County } from '../entities/county.entity';
/* istanbul ignore next */ 
@Injectable()
export class CountyRepository extends GenericRepository implements IAddressRepository {

	async getData(Request: string): Promise<string> {
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaCounty());
			const county = realm.objects<County>("County");			
			const results = JSON.stringify(county.filtered(`_id = uuid(${Request})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaCounty());
			const county = realm.objects<County>("County");			
			const results = JSON.stringify(county.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		try {
			return buildStructCounty();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}