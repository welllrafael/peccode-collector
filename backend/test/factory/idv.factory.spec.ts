import { IdvRepository } from '../../src/repositories/idv.repository';
import { IdvFactory } from '../../src/factory/idv.factory';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('Idv Factory', () => {

    let app: INestApplication;
    let idvFactory: IdvFactory;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [IdvFactory],                        
        }).compile();

        idvFactory = await module.get<IdvFactory>(IdvFactory);        

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing Idv Factory', () => {         

        it('Should be validate the idv type and return IdvRepository', async () => {            
            const instance = idvFactory.create();

            expect(instance.constructor.name).toEqual(IdvRepository.name);
        }); 
    });
});