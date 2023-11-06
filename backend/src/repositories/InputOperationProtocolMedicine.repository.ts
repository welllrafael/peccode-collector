import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaInputOperationProtocolMedicine, buildStructInputOperationProtocolMedicine } from './../entities/InputOperationProtocolMedicine';
import { InputOperationAnimal } from '../entities/inputOperationAnimal';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GenericRepository } from './generic.repository';
import { ObjectSchema, BSON } from 'realm';
import { IRepository } from './IRepository.interface';
import { InputOperationProtocolMedicine } from '../entities/InputOperationProtocolMedicine';
import { DeleteInputOperationProtocolMedicineDTO, PostInputOperationProtocolMedicineDTO, PutInputOperationProtocolMedicineDTO } from '../dto/inputOperationProtocolMedicine.dto';
/* istanbul ignore next */
@Injectable()
export class InputOperationProtocolMedicineRepository extends GenericRepository implements IRepository {
	async create(inputOperationProtocolMedicineData: PostInputOperationProtocolMedicineDTO): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationProtocolMedicine());
			
			const id: BSON.UUID = new BSON.UUID();
			const inputOperationMedicineId: BSON.UUID = new BSON.UUID(inputOperationProtocolMedicineData.inputOperationHealthProtocolId);

			realm.write(() => {
				const createInputOperation = realm.create<InputOperationProtocolMedicine>("InputOperationProtocolMedicine", {
					_id: id,					
					inputOperationHealthProtocolId: inputOperationMedicineId,
					medicineId: inputOperationProtocolMedicineData.medicineId,
					quantity: inputOperationProtocolMedicineData.quantity,
					createdAt: inputOperationProtocolMedicineData.createdAt,
					updatedAt: inputOperationProtocolMedicineData.updatedAt,
					deletedAt: inputOperationProtocolMedicineData.deletedAt
				});
			  });	
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.CREATED}, "id": "${id}" }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}		
	}

	async update(inputOperationProtocolMedicineData: PutInputOperationProtocolMedicineDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationProtocolMedicine());

			const inputOperation = realm.objects<InputOperationProtocolMedicine>("InputOperationProtocolMedicine");
			const existInputOperationProtocolMedicine = inputOperation.filtered(`_id = uuid(${inputOperationProtocolMedicineData.id})`)[0];			
			const inputOperationMedicineId: BSON.UUID = new BSON.UUID(existInputOperationProtocolMedicine.inputOperationHealthProtocolId);

			if(Boolean(existInputOperationProtocolMedicine)) {
				realm.write(() => {															
					existInputOperationProtocolMedicine.inputOperationHealthProtocolId = inputOperationMedicineId,
					existInputOperationProtocolMedicine.medicineId = inputOperationProtocolMedicineData.medicineId,
					existInputOperationProtocolMedicine.quantity = inputOperationProtocolMedicineData.quantity,
					existInputOperationProtocolMedicine.createdAt = inputOperationProtocolMedicineData.createdAt,
					existInputOperationProtocolMedicine.updatedAt = inputOperationProtocolMedicineData.updatedAt,
					existInputOperationProtocolMedicine.deletedAt = inputOperationProtocolMedicineData.deletedAt
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return JSON.stringify(inputOperationProtocolMedicineData);
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}	
	}
	async delete(delOperationProtocolMedicine: DeleteInputOperationProtocolMedicineDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationProtocolMedicine());

			const inputOperationAnimal = realm.objects<InputOperationProtocolMedicine>("InputOperationProtocolMedicine");
			const existInputOperationProtocolMedicine = inputOperationAnimal.filtered(`_id = uuid(${delOperationProtocolMedicine.id})`)[0];

			if(Boolean(existInputOperationProtocolMedicine)) {
				realm.write(() => {					
					realm.delete(existInputOperationProtocolMedicine);									
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.OK},  "message": "registro deletado com sucesso". }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getById(inputOperationId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationProtocolMedicine());
			const inputOperation = realm.objects<InputOperationProtocolMedicine>("InputOperationProtocolMedicine");			
			const results = JSON.stringify(inputOperation.filtered(`_id = uuid(${inputOperationId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getAll(): Promise<string> {
		
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaInputOperationProtocolMedicine());
			const inputOperation = realm.objects<InputOperationAnimal>("InputOperationAnimal");			
			const results = JSON.stringify(inputOperation.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructInputOperationProtocolMedicine();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
