import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaState, buildStructState } from './../entities/state.entity';
import { IAddressRepository } from './IAddressRepository.interface';
import { ObjectSchema } from 'realm';
import { HttpException, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { State } from '../entities/state.entity';
/* istanbul ignore next */ 
@Injectable()
export class StateRepository extends GenericRepository implements IAddressRepository {

	async getData(Request: string): Promise<string> {
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaState());
			const state = realm.objects<State>("State");			
			const results = JSON.stringify(state.filtered(`codigoUF = ${Request}`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaState());
			const state = realm.objects<State>("State");			
			const results = JSON.stringify(state.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		try {
			return buildStructState();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}