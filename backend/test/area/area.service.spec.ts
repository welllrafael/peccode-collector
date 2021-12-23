import { AreaModule } from '../../src/module/area.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AreaTest } from './databaseMock/area';
import { ObjectId } from 'bson';
import { AreaRepository } from '../../src/repository/area.repository'
import { AreaRepositoryMock } from './__mock__/AreaRepositoryMock';

describe('Test Realm Service', () => {

    let app:INestApplication;    
    let areaRepository: AreaRepository;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: AreaRepository,
            useClass: AreaRepositoryMock
        };

        const moduleRef = await Test.createTestingModule({
            providers: [AreaRepository, ApiServiceProvider]        
      }).compile();                        

        app = moduleRef.createNestApplication();        
        await app.init();

        areaRepository = moduleRef.get<AreaRepository>(AreaRepository);
    })

    describe('CRUD Area', () => {
        
        it('Should be get data in RealmDB', async () => {
            
            const idArea: string = '61c4e4551cd81b4dbf8ee1e3';

            const areaRepositoryResponse = await areaRepository.getAreaById(idArea);

            jest.spyOn(areaRepository, 'getAreaById').mockImplementation(() => Promise.resolve(areaRepositoryResponse).then());

            expect(areaRepositoryResponse).toHaveProperty('_id');
            expect(areaRepositoryResponse).toHaveProperty('name');
            expect(areaRepositoryResponse).toHaveProperty('size');
        })
    });
});