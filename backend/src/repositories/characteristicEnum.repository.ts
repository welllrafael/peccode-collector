import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaCharacteristicEnum, buildStructCharacteristicEnum } from './../entities/characteristicEnum.entity';
import { HttpException, Injectable } from "@nestjs/common";
import { CharacteristicEnum } from "../entities/characteristicEnum.entity";
import { GenericRepository } from './generic.repository';
import { ObjectSchema } from 'realm';
import { IViewRepository } from './IViewRepository.interface';
/* istanbul ignore next */
@Injectable()
export class CharacteristicEnumRepository extends GenericRepository implements IViewRepository {	

	async getById(characteristicEnumId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaCharacteristicEnum());
			const characteristicEnum = realm.objects<CharacteristicEnum>("CharacteristicEnum");			
			const results = JSON.stringify(characteristicEnum.filtered(`_id = uuid(${characteristicEnumId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaCharacteristicEnum());
			const characteristicEnum = realm.objects<CharacteristicEnum>("CharacteristicEnum");			
			const results = JSON.stringify(characteristicEnum.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructCharacteristicEnum();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
