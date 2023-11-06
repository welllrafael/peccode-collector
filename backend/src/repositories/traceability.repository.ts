import { CollectionPecCode } from './../model/collection.model';
import { buildSchemaTraceability, buildStructTraceability } from './../entities/traceability.entity';
import { DeleteTraceabilityDTO, PostTraceabilityDTO, PutTraceabilityDTO } from '../dto/traceability.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Traceability } from "../entities/traceability.entity";
import { GenericRepository } from './generic.repository';
import { ObjectSchema, BSON } from 'realm';
import { IRepository } from './IRepository.interface';
/* istanbul ignore next */
@Injectable()
export class TraceabilityRepository extends GenericRepository implements IRepository {
	async update(traceabilityData: PutTraceabilityDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaTraceability());

			const animalId = new BSON.UUID(traceabilityData.animalId)
			const farmId = new BSON.UUID(traceabilityData.farmId)
			
			const traceability = realm.objects<Traceability>("Traceability");
			const existTraceability = traceability.filtered(`_id = uuid(${traceabilityData.id})`)[0];			

			if(Boolean(existTraceability)) {
				realm.write(() => {										
					existTraceability.sisbovNumber = +traceabilityData.sisbovNumber,
					existTraceability.animalId = animalId,
					existTraceability.farmId = farmId,
					existTraceability.manejo = +traceabilityData.manejo,
					existTraceability.sisbovDate = traceabilityData.sisbovDate,
					existTraceability.solNumber = +traceabilityData.solNumber,
					existTraceability.cotaHiltonDate = traceabilityData.cotaHiltonDate,
					existTraceability.slaughterReleaseDate = traceabilityData.slaughterReleaseDate,
					existTraceability.status = traceabilityData.status,
					existTraceability.obs = traceabilityData.obs									
				});	
			} else {
				super.closeConnectionRealm();
				return `{ "code": ${HttpStatus.NOT_FOUND},  "message": "registro não encontrado." }`;
			}
			  
			super.closeConnectionRealm();

			return JSON.stringify(traceabilityData);
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}	
	}
	async delete(traceabilityData: DeleteTraceabilityDTO): Promise<string> {
		try {			
			const realm: Realm = await super.openConnectionRealm(buildSchemaTraceability());

			const traceability = realm.objects<Traceability>("Traceability");
			const existTraceability = traceability.filtered(`_id = uuid(${traceabilityData.id})`)[0];

			if(Boolean(existTraceability)) {
				realm.write(() => {					
					realm.delete(existTraceability);									
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

	async getAll(): Promise<string> {

		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaTraceability());
			const traceability = realm.objects<Traceability>("Traceability");			
			const results = JSON.stringify(traceability.sorted("_id"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async getById(traceabilityId: string): Promise<string> {

		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaTraceability());
			const traceability = realm.objects<Traceability>("Traceability");			
			const results = JSON.stringify(traceability.filtered(`_id = uuid(${traceabilityId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async create(traceabilityData: PostTraceabilityDTO): Promise<string> {
		try {
			const realm: Realm = await super.openConnectionRealm(buildSchemaTraceability());
			const { UUID } = Realm.BSON;
			
			const id: BSON.UUID = new UUID();
			const animalId = new UUID(traceabilityData.animalId)
			const farmId = new UUID(traceabilityData.farmId)

			realm.write(() => {
				const createTraceability = realm.create<Traceability>("Traceability", {
					_id: id,
					sisbovNumber: +traceabilityData.sisbovNumber,
					animalId: animalId,
					farmId: farmId,
					manejo: +traceabilityData.manejo,
					sisbovDate: new Date(traceabilityData.sisbovDate),
					solNumber: +traceabilityData.solNumber,
					cotaHiltonDate: new Date(traceabilityData.cotaHiltonDate),
					slaughterReleaseDate: new Date(traceabilityData.slaughterReleaseDate),
					status: traceabilityData.status,
					obs: traceabilityData.obs					
				});
			  });	
			  
			super.closeConnectionRealm();

			return `{ "code": ${HttpStatus.CREATED},  "id": ${id} }`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}		
	}

	getStruct(): CollectionPecCode {
		
		try {
			return buildStructTraceability();
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}

	}
}
