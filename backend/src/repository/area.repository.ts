import { IAreaRepository } from './IAreaRepository.interface';
import { Injectable } from "@nestjs/common";
import { Area } from "../model/area.model"
import { ObjectId } from "bson";
import { ConnectRealmDB}  from "../database/area.database"

@Injectable()
export class AreaRepository implements IAreaRepository {

	constructor(private connectRealmDB: ConnectRealmDB) {}

	async getArea(): Promise<string> {

		try {
			const realm: Realm = await this.connectRealmDB.getConnectionRealm();

			const areas = realm.objects<Area>("Area");			
			const results = JSON.stringify(areas.sorted("name"), null, 2);

			this.connectRealmDB.closeConnectionRealm();
			
			return results;
		} catch (error) {
			return error.message;
		}
	}

	async postArea(): Promise<string> {

		try {
			const realm: Realm = await this.connectRealmDB.getConnectionRealm();

			realm.write(() => {
				const task1 = realm.create<Area>("Area", {
				  _id: new ObjectId(),
				  name: "Tarefa 1",
				  size: "Open",
				});
				const task2 = realm.create<Area>("Area", {
				  _id: new ObjectId(),
				  name: "Tarefa 2",
				  size: "Busy",
				});				
			  });	
			  
			  this.connectRealmDB.closeConnectionRealm();

			  return `Criadas duas tarefas`;
		} catch (error) {
			return error.message;
		}
	}

	async putArea(): Promise<string> {

		try {
			const realm: Realm = await this.connectRealmDB.getConnectionRealm();

			const area = realm.objects<Area>("Area");
			const someArea = area.filtered("status <> ''")[0];
	
			if(!!someArea){
				realm.write(() => {
					someArea.size = 'InProgress';				
				});			
	
				this.connectRealmDB.closeConnectionRealm();
	
				return `Status alterado das tarefas`;
			}

			return `Tarefas sem status para alteração`;

		} catch (error) {
			return error.message;
		}
	}

	async deleteArea(): Promise<string> {

		try {
			const realm: Realm = await this.connectRealmDB.getConnectionRealm();

			realm.write(() => {	
				realm.delete(realm.objects("Area"));				
			});			

			this.connectRealmDB.closeConnectionRealm();

			return `Tarefas deletadas`;
		
		} catch (error) {
			return error.message;
		}				
	}
}
