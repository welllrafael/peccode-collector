import { buildStructCharacteristic } from './../entities/characteristic.entity';
import { CollectionPecCode } from './../model/collection.model';
import { HttpException, Injectable } from "@nestjs/common";
import { buildSchemaCharacteristic, Characteristic } from "../entities/characteristic.entity";
import { GenericRepository } from './generic.repository';
import { ObjectSchema } from 'realm';
import { IViewRepository } from './IViewRepository.interface';
/* istanbul ignore next */
@Injectable()
export class CharacteristicRepository extends GenericRepository implements IViewRepository {	

	async getById(characteristicId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaCharacteristic());
			const characteristic = realm.objects<Characteristic>("Characteristic");			
			const results = JSON.stringify(characteristic.filtered(`_id = uuid(${characteristicId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaCharacteristic());
			const characteristic = realm.objects<Characteristic>("Characteristic");			
			const results = JSON.stringify(characteristic.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructCharacteristic();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
