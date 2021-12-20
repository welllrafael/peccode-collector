import { AreaModule } from '../../src/module/area.module';
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AreaTest } from './databaseMock/area';
import { ObjectId } from "bson";
import { AreaRepository } from "../../src/repository/area.repository"

describe('CRUD Area', () => {        
    let app:INestApplication;    
    let realmDBTest: Realm;
    let objectRealm: AreaRepository;
  
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AreaModule]
      }).compile();
                  
        realmDBTest = await objectRealm.getConnectionRealm();

        app = moduleRef.createNestApplication();
        
        await app.init();
    })
    
    afterAll(async () => {
            
        await objectRealm.closeConnectionRealm();

        await app.close();        
    })
  
    it('/POST Area', async () => {
        
        await objectRealm.deleteArea();

        expect(realmDBTest.objects("AreaTest").length).toEqual(0);

        realmDBTest.write(() => {
            const area1 = realmDBTest.create<AreaTest>("AreaTest", {
              _id: new ObjectId(),
              name: "Area 1",
              size: "100",
            });
          });                

        expect(realmDBTest.objects("AreaTest").length).toEqual(1);
    });

    it('/GET Area', async () => {            
			const area = realmDBTest.objects<AreaTest>("AreaTest");			
			const results = JSON.stringify(area.sorted("name"), null, 2);

      expect(results.length).toBeGreaterThan(0);
    });

    it('/PUT Area', async () => {        
        const area = realmDBTest.objects<AreaTest>("AreaTest");
        const someTask = area.filtered("name == 'Area 1'")[0];

        if(someTask){
            realmDBTest.write(() => {
                someTask.name = "Area Updated";				
            });			                                    
        }    

        expect(someTask.name).toBe("Area Updated");
    });
    
    it('/DELETE Area', async () => {        
        await objectRealm.deleteArea();

        expect(realmDBTest.objects("AreaTest").length).toEqual(0);
    });

})