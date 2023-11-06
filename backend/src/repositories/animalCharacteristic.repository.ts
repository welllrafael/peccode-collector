import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaAnimalCharacteristic, buildStructAnimalCharacteristic } from './../entities/animalCharacteristic.entity';
import { BSON } from 'realm';
import { DeleteAnimalCharacteristicDTO, PostAnimalCharacteristicDTO, PutAnimalCharacteristicDTO } from '../dto/animalCharacteristic.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AnimalCharacteristic } from "../entities/animalCharacteristic.entity";
import { GenericRepository } from './generic.repository';
import { ObjectSchema } from 'realm';
import { IRepository } from './IRepository.interface';
/* istanbul ignore next */
@Injectable()
export class AnimalCharacteristicRepository extends GenericRepository implements IRepository {
	async create(animalData: PostAnimalCharacteristicDTO): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimalCharacteristic());
			const id: BSON.UUID = new BSON.UUID();
			const characteristicId: BSON.UUID = new BSON.UUID(animalData.characteristicId);
			const animalId: BSON.UUID = new BSON.UUID(animalData.animalId);			

			realm.write(() => {
				const createAnimal = realm.create<AnimalCharacteristic>("AnimalCharacteristic", {
					_id: id,					
					characteristicId: characteristicId,
					animalId: animalId, 
					value:  animalData.value
				});
			  });	
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.CREATED}, "id": "${id}" }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}		
	}

	async update(animalData: PutAnimalCharacteristicDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimalCharacteristic());

			const ide = realm.objects<AnimalCharacteristic>("AnimalCharacteristic");
			const existAnimal = ide.filtered(`_id = uuid(${animalData.id})`)[0];			

			const characteristicId: BSON.UUID = new BSON.UUID(animalData.characteristicId);
			const animalId: BSON.UUID = new BSON.UUID(animalData.animalId);			

			if(Boolean(existAnimal)) {
				realm.write(() => {															
					existAnimal.characteristicId = characteristicId,
					existAnimal.animalId = animalId, 
					existAnimal.value = animalData.value
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return JSON.stringify(animalData);
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}	
	}
	async delete(animalData: DeleteAnimalCharacteristicDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimalCharacteristic());

			const ide = realm.objects<AnimalCharacteristic>("AnimalCharacteristic");
			const existAnimal = ide.filtered(`_id = uuid(${animalData.id})`)[0];

			if(Boolean(existAnimal)) {
				realm.write(() => {					
					realm.delete(existAnimal);									
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.OK},  "message": registro deletado com sucesso. }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getById(animalCharacteristicId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimalCharacteristic());
			const animalCharacteristic = realm.objects<AnimalCharacteristic>("AnimalCharacteristic");			
			const results = JSON.stringify(animalCharacteristic.filtered(`_id = uuid(${animalCharacteristicId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaAnimalCharacteristic());
			const animalCharacteristic = realm.objects<AnimalCharacteristic>("AnimalCharacteristic");			
			const results = JSON.stringify(animalCharacteristic.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructAnimalCharacteristic();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
