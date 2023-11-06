import * as Realm from "realm";
import { buildSchemaAddress } from './../entities/address.entity';
import { buildSchemaAnimalAgeGroup } from './../entities/animalAgeGroup.entity';
import { buildSchemaAnimalCurrentData } from './../entities/animalCurrentData.entity';
import { buildSchemaCharacteristic } from './../entities/characteristic.entity';
import { buildSchemaCharacteristicEnum } from './../entities/characteristicEnum.entity';
import { buildSchemaCounty } from './../entities/county.entity';
import { buildSchemaFarmLotType } from './../entities/farmLotType.entity';
import { buildSchemaFarmSector } from './../entities/farmSector.entity';
import { buildSchemaIdv } from './../entities/idv.entity';
import { buildSchemaInputOperationAnimal } from './../entities/inputOperationAnimal';
import { buildSchemaInputOperationProtocolMedicine } from './../entities/InputOperationProtocolMedicine';
import { buildSchemaInputOperationTraceability } from './../entities/InputOperationTraceability';
import { buildSchemaRegion } from './../entities/region.entity';
import { buildSchemaSisbovRequest } from './../entities/sisbovRequest.entity';
import { buildSchemaState } from './../entities/state.entity';
import { buildSchemaTraceability } from './../entities/traceability.entity';
import { buildSchemaAnimal } from './../entities/animal.entity';
import { buildSchemaGrower } from './../entities/grower.entity';
import { HttpException, Injectable } from "@nestjs/common";
import { buildSchemaInputOperationHealthProtocol } from '../entities/InputOperationHealthProtocol';
import { buildSchemaSisbovNumber } from '../entities/sisbovNumber.entity';
import { buildSchemaIde } from '../entities/ide.entity';
import { buildSchemaFarmLot } from '../entities/farmLot.entity';
import { buildSchemaFarmAreaType } from '../entities/farmAreaType.entity';
import { buildSchemaFarmArea } from '../entities/farmArea.entity';
import { buildSchemaFarm } from '../entities/farm.entity';
import { buildSchemaInputOperation } from '../entities/inputOperation';
import { buildSchemaCountry } from '../entities/country.entity';
import { buildSchemaBreed } from '../entities/breed.entity';
import { buildSchemaAnimalCharacteristic } from '../entities/animalCharacteristic.entity';
import { buildSchemaOutputMovement } from './../entities/outputMovement';
import { buildSchemaMovementType } from './../entities/movementType';
import { buildSchemaInternalMovement } from './../entities/internalMovement';
import { buildSchemaInputMovement } from './../entities/inputMovement';
/* istanbul ignore next */
@Injectable()
export class GenericRepository {

    private realm: Realm;
    private app = new Realm.App({ id: "peccode-coletor-backend-gijfu" });
    constructor(){}

    async getConnectionRealm(): Promise<boolean> {
		
        const apiKey = process.env?.realmServerApiKey;
        const credentials = Realm.Credentials.userApiKey(apiKey);
        if (!apiKey) {
            throw new Error("Could not find a Realm Server API Key.");
        }

        try {                    
            
            //Caso o usuario esteja conectado, ele encerra a conexao
            //this.app.currentUser?.logOut();
            if (!this.app.currentUser) {
                await this.app.logIn(credentials);   
            }            
            
            return await Boolean(this.app.currentUser);
            
        } catch (error) {
            throw new HttpException(error.message, error.code);
        }
    }

    async closeConnectionRealm(): Promise<void> {

		//const app = new Realm.App({ id: "peccode-coletor-backend-gijfu" });

        //Caso o usuario esteja conectado, ele encerra a conexao
        //app.currentUser?.logOut();

        //Desconecto o Realm.
        //this.realm.close();

    }

    async openConnectionRealm(schema: Realm.ObjectSchema): Promise<Realm> {

        if(await this.getConnectionRealm()){
            this.realm = await Realm.open({
                schema: this.getSchemas(),
                sync: {
                  user: this.app.currentUser as Realm.User,
                  partitionValue: "PecCodeCollector"                
                },
            });
        }

        return this.realm;            
    }

    private getSchemas() : Array<Realm.ObjectSchema>{
        return[buildSchemaGrower(), 
            buildSchemaAnimal(),
            buildSchemaTraceability(),
            buildSchemaState(),
            buildSchemaSisbovRequest(),
            buildSchemaSisbovNumber(),
            buildSchemaRegion(),
            buildSchemaInputOperationTraceability(),
            buildSchemaInputOperationProtocolMedicine(),
            buildSchemaInputOperationHealthProtocol(),
            buildSchemaInputOperationAnimal(),
            buildSchemaInputOperation(),
            buildSchemaIdv(),
            buildSchemaIde(),
            buildSchemaFarmSector(),
            buildSchemaFarmLotType(),
            buildSchemaFarmLot(),
            buildSchemaFarmAreaType(),
            buildSchemaFarmArea(),
            buildSchemaFarm(),
            buildSchemaCounty(),
            buildSchemaCountry(),
            buildSchemaCharacteristicEnum(),
            buildSchemaCharacteristic(),
            buildSchemaBreed(),
            buildSchemaAnimalCurrentData(),
            buildSchemaAnimalCharacteristic(),
            buildSchemaAnimalAgeGroup(),
            buildSchemaAddress(),
            buildSchemaInputMovement(),
            buildSchemaInternalMovement(),
            buildSchemaMovementType(),
            buildSchemaOutputMovement()
        ];
    }
}