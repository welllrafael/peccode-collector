import { DeleteAreaDTO, PostAreaDTO, PutAreaDTO } from './../DTO/area.dto';
import { IAreaRepository } from './IAreaRepository.interface';
import { HttpException, Injectable } from "@nestjs/common";
import { Area } from "../entities/area.entities"
import { ObjectId } from "bson";
import { GenericRepository } from './generic.repository';

@Injectable()
export class AreaRepository extends GenericRepository implements IAreaRepository {	

	async getAreaById(areaId: string): Promise<string> {
		
		try {
			const realm: Realm = await super.getConnectionRealm();

			const areas = realm.objects<Area>("Area");			
			const results = JSON.stringify(areas.filtered(`_id = oid(${areaId})`), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async postAreaById(postAreaDTO: PostAreaDTO): Promise<string> {

		try {
			const realm: Realm = await super.getConnectionRealm();

			realm.write(() => {
				const createArea1 = realm.create<Area>("Area", {
				  _id: new ObjectId(),
				  name: postAreaDTO.nameArea,
				  size: postAreaDTO.sizeArea,
				});
			  });	
			  
			  super.closeConnectionRealm();

			  return `Tarefa criada com sucesso!`;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async putAreaById(putAreaDTO: PutAreaDTO): Promise<string> {

		try {
			const realm: Realm = await super.getConnectionRealm();

			const area = realm.objects<Area>("Area");
			const someArea = area.filtered(`_id = oid(${putAreaDTO.areaID})`)[0];
	
			if(!!someArea){
				realm.write(() => {
					someArea.name = putAreaDTO.nameArea;				
					someArea.size = putAreaDTO.sizeArea;				
				});			
	
				super.closeConnectionRealm();
	
				return `Dados alterados com sucesso!`;
			}

			return `Nenhum registro alterado!`;

		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	async deleteAreaById(deleteAreaDTO: DeleteAreaDTO): Promise<string> {

		try {
			const realm: Realm = await super.getConnectionRealm();
			const area = realm.objects<Area>("Area");
			const someArea = area.filtered(`_id = oid(${deleteAreaDTO.areaID})`)[0];

			realm.write(() => {	
				realm.delete(someArea);				
			});			

			super.closeConnectionRealm();

			return `Tarefa deletada com sucesso!`;
		
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}				
	}

	async deleteAllArea(): Promise<string> {

		try {
			const realm: Realm = await super.getConnectionRealm();

			realm.write(() => {	
				realm.delete(realm.objects("Area"));				
			});			

			super.closeConnectionRealm();

			return `Tarefas deletadas com sucesso!`;
		
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}				
	}
}
