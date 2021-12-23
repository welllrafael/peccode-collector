import { IArea } from './../../../src/repository/IAreaRepository.interface';
import { AreaTestSchema } from "../databaseMock/area";
import { fakeReturn } from "./constants/realm_returns";
import * as Realm from "realm";

export class AreaRepositoryMock {
    
    private app: Realm.App;
    private realm: Realm;

    public async getAreaById(areaId?: string): Promise<IArea> {
        return new Promise(async (resolve, reject) => {

            await this.setRealmInstance();

            this.app.currentUser?.logOut();
            this.realm.close();

            resolve(fakeReturn);

        });
    }

    private async setRealmInstance() {

        this.app = new Realm.App({ id: "peccode-coletor-backend-gijfu" });
		const credentials = Realm.Credentials.anonymous();        
        
        await this.app.logIn(credentials);

        this.realm = await Realm.open({
            schema: [AreaTestSchema],
            sync: {
              user: this.app.currentUser as Realm.User,
              partitionValue: "coletorAreaTeste"                
            },
        });

        return this.realm;
    }
}