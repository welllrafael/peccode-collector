import { IAreaRepository } from './IAreaRepository.interface';
import { Injectable } from "@nestjs/common";
import { Area } from "../entities/area.entities"
import { ObjectId } from "bson";
import { GenericRepository } from './generic.repository';

@Injectable()
export class AreaRepository extends GenericRepository implements IAreaRepository {	

	async getArea(): Promise<string> {
		
		try {
			const realm: Realm = await super.getConnectionRealm();

			const areas = realm.objects<Area>("Area");			
			const results = JSON.stringify(areas.sorted("name"), null, 2);

			super.closeConnectionRealm();
			
			return results;
		} catch (error) {
			return error.message;
		}
	}

	async postArea(): Promise<string> {

		try {
			const realm: Realm = await super.getConnectionRealm();

			realm.write(() => {
				const createArea1 = realm.create<Area>("Area", {
				  _id: new ObjectId(),
				  name: "Area 1",
				  size: "100",
				});
				const createArea2 = realm.create<Area>("Area", {
				  _id: new ObjectId(),
				  name: "Area 2",
				  size: "200",
				});				
			  });	
			  
			  super.closeConnectionRealm();

			  return `Criadas duas tarefas`;
		} catch (error) {
			return error.message;
		}
	}

	async putArea(): Promise<string> {

		try {
			const realm: Realm = await super.getConnectionRealm();

			const area = realm.objects<Area>("Area");
			const someArea = area.filtered("size > '0'")[0];
	
			if(!!someArea){
				realm.write(() => {
					someArea.size = 'InProgress';				
				});			
	
				super.closeConnectionRealm();
	
				return `Tamanho alterado das tarefas`;
			}

			return `Tarefas sem tamanho para alteração`;

		} catch (error) {
			return error.message;
		}
	}

	async deleteArea(): Promise<string> {

		try {
			const realm: Realm = await super.getConnectionRealm();

			realm.write(() => {	
				realm.delete(realm.objects("Area"));				
			});			

			super.closeConnectionRealm();

			return `Tarefas deletadas`;
		
		} catch (error) {
			return error.message;
		}				
	}
}
