import { AreaSchema } from './../entities/area.entities';
import { Injectable } from "@nestjs/common";
import * as Realm from "realm";

@Injectable()
export class GenericRepository {

    private realm: Realm;

    constructor(){}

    async getConnectionRealm(): Promise<Realm> {

		const app = new Realm.App({ id: "peccode-coletor-backend-gijfu" });
		const credentials = Realm.Credentials.anonymous();

        try {                    

            //Caso o usuário esteja conectado, ele encerra a conexão
            app.currentUser?.logOut();

            await app.logIn(credentials);

            return await this.openConnectionRealm(app);            
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

    async openConnectionRealm(app: Realm.App): Promise<Realm> {

        this.realm = await Realm.open({
            schema: [AreaSchema],
            sync: {
              user: app.currentUser as Realm.User,
              partitionValue: "coletorAreaTeste"                
            },
        });

        return this.realm;            
    }
}