import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaBreed, buildStructBreed } from './../entities/breed.entity';
import { HttpException, Injectable } from "@nestjs/common";
import { Breed } from "../entities/breed.entity";
import { GenericRepository } from './generic.repository';
import { ObjectSchema } from 'realm';
import { IViewRepository } from './IViewRepository.interface';
/* istanbul ignore next */
@Injectable()
export class BreedRepository extends GenericRepository implements IViewRepository {	

	async getById(breedId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaBreed());
			const breed = realm.objects<Breed>("Breed");			
			const results = JSON.stringify(breed.filtered(`_id = uuid(${breedId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaBreed());
			const breed = realm.objects<Breed>("Breed");			
			const results = JSON.stringify(breed.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructBreed();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
