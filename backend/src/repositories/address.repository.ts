import { CollectionPecCode } from './../model/collection.model';
import { buildStructAddress } from './../entities/address.entity';
import { IAddressRepository } from './IAddressRepository.interface';
import { HttpException, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { Address, buildSchemaAddress } from '../entities/address.entity';
/* istanbul ignore next */ 
@Injectable()
export class AddressRepository extends GenericRepository implements IAddressRepository {

	async getData(Request: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAddress());
			const address = realm.objects<Address>("Address");			
			const results = JSON.stringify(address.filtered(`_id = uuid(${Request})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAddress());
			const address = realm.objects<Address>("Address");			
			const results = JSON.stringify(address.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructAddress();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}