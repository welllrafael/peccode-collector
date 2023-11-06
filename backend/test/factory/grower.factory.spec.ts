import { GrowerRepository } from '../../src/repositories/grower.repository';
import { GrowerFactory } from '../../src/factory/grower.factory';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('Grower Factory', () => {

    let app: INestApplication;
    let growerFactory: GrowerFactory;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GrowerFactory],                        
        }).compile();

        growerFactory = await module.get<GrowerFactory>(GrowerFactory);        

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing Grower Factory', () => {         

        it('Should be validate the grower type and return GrowerRepository', async () => {            
            const instance = growerFactory.create();

            expect(instance.constructor.name).toEqual(GrowerRepository.name);
        }); 
    });
});