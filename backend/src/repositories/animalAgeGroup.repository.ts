import { buildStructAnimalAgeGroup, buildSchemaAnimalAgeGroup } from './../entities/animalAgeGroup.entity';
import { CollectionPecCode } from './../model/collection.model';
/* istanbul ignore next */
import { IViewRepository } from './IViewRepository.interface';
import { HttpException, Injectable } from "@nestjs/common";
import { AnimalAgeGroup } from "../entities/animalAgeGroup.entity";
import { GenericRepository } from './generic.repository';
/* istanbul ignore next */
@Injectable()
export class AnimalAgeGroupRepository extends GenericRepository implements IViewRepository {

	async getById(animalAgeGroupId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimalAgeGroup());
			const animalAgeGroup = realm.objects<AnimalAgeGroup>("AnimalAgeGroup");			
			const results = JSON.stringify(animalAgeGroup.filtered(`_id = uuid(${animalAgeGroupId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimalAgeGroup());
			const animalAgeGroup = realm.objects<AnimalAgeGroup>("AnimalAgeGroup");			
			const results = JSON.stringify(animalAgeGroup.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructAnimalAgeGroup();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
