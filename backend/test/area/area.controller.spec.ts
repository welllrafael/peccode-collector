import { DeleteAreaDTO, PostAreaDTO, PutAreaDTO } from './../../src/DTO/area.dto';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AreaRepository } from '../../src/repository/area.repository'
import { AreaRepositoryMock } from './__mock__/AreaRepositoryMock';
import * as Realm from "realm";

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

            jest.spyOn(areaRepository, 'getAreaById').mockImplementation(() => Promise.resolve(areaRepositoryResponse));

            expect(areaRepositoryResponse).toHaveProperty('_id');
            expect(areaRepositoryResponse).toHaveProperty('name');
            expect(areaRepositoryResponse).toHaveProperty('size');
        })

        it('Should be save data in RealmDB', async () => {
            
            const postArea: PostAreaDTO = {nameArea: "Area de teste mocada", sizeArea: 100};            
            const areaRepositoryResponse = await areaRepository.postAreaById(postArea);

            jest.spyOn(areaRepository, 'postAreaById').mockImplementation(() => Promise.resolve(areaRepositoryResponse));
            
            expect(areaRepositoryResponse).toHaveProperty('_id', '61c4e4551cd81b4dbf8ee1e3');
        })

        it('Should be delete data in RealmDB', async () => {
            
            const deleteArea: DeleteAreaDTO = {areaID: '61c4e4551cd81b4dbf8ee1e3'};
            const areaRepositoryResponse = await areaRepository.deleteAreaById(deleteArea);

            jest.spyOn(areaRepository, 'deleteAreaById').mockImplementation(() => Promise.resolve(areaRepositoryResponse));
            
            expect(areaRepositoryResponse).toHaveProperty('_id', '');
        })
        
        it('Should be update data in RealmDB', async () => {
            
            const putArea: PutAreaDTO = {areaID: '61c4e4551cd81b4dbf8ee1e3', nameArea: 'Update area mock', sizeArea: 1000};
            const areaRepositoryResponse = await areaRepository.putAreaById(putArea);

            jest.spyOn(areaRepository, 'putAreaById').mockImplementation(() => Promise.resolve(areaRepositoryResponse));
            
            expect(areaRepositoryResponse).toHaveProperty('name', 'Update area mock');
        })        
    });
});