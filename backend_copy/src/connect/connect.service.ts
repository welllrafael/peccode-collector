import { Injectable } from "@nestjs/common";
import * as Realm from "realm";
import { TaskSchema } from "../model/users.model"

@Injectable()
export class ConnectRealmDB {

    constructor(private realm: Realm){

    }

    async getConnectionRealm(): Promise<Realm> {

		const app = new Realm.App({ id: "peccode-coletor-backend-gijfu" });
		const credentials = Realm.Credentials.anonymous();

        try {
            
            //Caso o usuário esteja conectado, ele encerra a conexão
            if(!app.currentUser){
                await app.logIn(credentials);
                console.log(`New login in anonymously with user id: ${app.currentUser?.id}`);
            } else {
                console.log(`Logged in anonymously with user id: ${app.currentUser?.id}`);
            }            

            this.realm = await Realm.open({
              schema: [TaskSchema],
              sync: {
                user: app.currentUser as Realm.User,
                partitionValue: "coletor"                
              },
            });
    
            return this.realm;            
        } catch (error) {
            return error.message;
        }
    }

    async closeConnectionRealm(): Promise<void> {

		const app = new Realm.App({ id: "peccode-coletor-backend-gijfu" });

        //Caso o usuário esteja conectado, ele encerra a conexão
        app.currentUser?.logOut();

        //Desconecto o Realm.
        this.realm.close();

    }
}