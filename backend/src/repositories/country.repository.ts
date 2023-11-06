import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaCountry, buildStructCountry } from './../entities/country.entity';
import { IAddressRepository } from './IAddressRepository.interface';
import { Country } from '../entities/country.entity';
import { HttpException, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';

/* istanbul ignore next */ 
@Injectable()
export class CountryRepository extends GenericRepository implements IAddressRepository {

	async getData(Request: string): Promise<string> {
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaCountry());
			const country = realm.objects<Country>("Country");			
			const results = JSON.stringify(country.filtered(`_id = uuid(${Request})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaCountry());
			const country = realm.objects<Country>("Country");			
			const results = JSON.stringify(country.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		try {
			return buildStructCountry();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}