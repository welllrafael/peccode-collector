import { Injectable } from "@nestjs/common";
import { Task } from "./model/users.model"
import { ObjectId } from "bson";
import { ConnectRealmDB}  from "./connect/connect.service"

@Injectable()
export class AppService {

	constructor(private connectRealmDB: ConnectRealmDB) {}

	async getTasks(): Promise<string> {

		try {
			const realm: Realm = await this.connectRealmDB.getConnectionRealm();

			// Get all Tasks in the realm
			const tasks = realm.objects<Task>("Task");			
			const results = JSON.stringify(tasks.sorted("name"), null, 2);

			this.connectRealmDB.closeConnectionRealm();
			
			return results;
		} catch (error) {
			return error.message;
		}
	}

	async sendTasks(): Promise<string> {

		try {
			const realm: Realm = await this.connectRealmDB.getConnectionRealm();

			// Add a couple of Tasks in a single, atomic transaction
			// Realm automatically sets the _partition property based on the partitionValue used to open the realm
			realm.write(() => {
				const task1 = realm.create<Task>("Task", {
				  _id: new ObjectId(),
				  name: "Tarefa 1",
				  status: "Open",
				});
				const task2 = realm.create<Task>("Task", {
				  _id: new ObjectId(),
				  name: "Tarefa 2",
				  status: "Busy",
				});				
			  });	
			  
			  this.connectRealmDB.closeConnectionRealm();

			  return `Criadas duas tarefas`;
		} catch (error) {
			return error.message;
		}
	}

	async updateTask(): Promise<string> {

		try {
			const realm: Realm = await this.connectRealmDB.getConnectionRealm();

			// Get all Tasks in the realm
			const tasks = realm.objects<Task>("Task");
			const someTask = tasks.filtered("status <> ''")[0];
	
			if(!!someTask){
				realm.write(() => {
					someTask.status = 'InProgress';				
				});			
	
				this.connectRealmDB.closeConnectionRealm();
	
				return `Status alterado das tarefas`;
			}

			return `Tarefas sem status para alteração`;

		} catch (error) {
			return error.message;
		}
	}

	async deleteTask(): Promise<string> {

		try {
			const realm: Realm = await this.connectRealmDB.getConnectionRealm();

			// Get all Tasks in the realm
			//const tasks = realm.objects<Task>("Task");
			//let someTask = tasks.filtered("status <> ''")[0];
	
			realm.write(() => {
				//realm.delete(someTask);
	
				realm.delete(realm.objects("Task"));				
			});			

			this.connectRealmDB.closeConnectionRealm();

			return `Tarefas deletadas`;
		
		} catch (error) {
			return error.message;
		}				
	}
}
