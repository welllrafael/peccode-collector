import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaSisbovNumber, buildStructSisbovNumber } from './../entities/sisbovNumber.entity';
import { HttpException, Injectable } from "@nestjs/common";
import { SisbovNumber } from "../entities/sisbovNumber.entity";
import { GenericRepository } from './generic.repository';
import { ObjectSchema } from 'realm';
import { IViewRepository } from './IViewRepository.interface';
/* istanbul ignore next */
@Injectable()
export class SisbovNumberRepository extends GenericRepository implements IViewRepository {	

	async getById(sisbovId: string): Promise<string> {

		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaSisbovNumber());
			const sisbovNumber = realm.objects<SisbovNumber>("SisbovNumber");			
			const results = JSON.stringify(sisbovNumber.filtered(`sisbovNumber = ${sisbovId}`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {

		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaSisbovNumber());
			const sisbovNumber = realm.objects<SisbovNumber>("SisbovNumber");			
			const results = JSON.stringify(sisbovNumber.sorted("sisbovNumber"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructSisbovNumber();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
