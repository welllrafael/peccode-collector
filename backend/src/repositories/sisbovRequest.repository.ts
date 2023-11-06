import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaSisbovRequest, buildStructSisbovRequest } from './../entities/sisbovRequest.entity';
import { HttpException, Injectable } from "@nestjs/common";
import { SisbovRequest } from "../entities/sisbovRequest.entity";
import { GenericRepository } from './generic.repository';
import { ObjectSchema } from "realm";
import { IViewRepository } from "./IViewRepository.interface";
/* istanbul ignore next */
@Injectable()
export class SisbovRequestRepository extends GenericRepository implements IViewRepository {	

	async getById(sisbovRequestId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaSisbovRequest());
			const sisbovRequest = realm.objects<SisbovRequest>("SisbovRequest");			
			const results = JSON.stringify(sisbovRequest.filtered(`requestNumber = ${sisbovRequestId}`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaSisbovRequest());
			const sisbovRequest = realm.objects<SisbovRequest>("SisbovRequest");			
			const results = JSON.stringify(sisbovRequest.sorted("requestNumber"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructSisbovRequest();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
