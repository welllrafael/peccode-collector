import { TraceabilityRepository } from '../../src/repositories/traceability.repository';
import { TraceabilityFactory } from '../../src/factory/traceability.factory';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('Traceability Factory', () => {

    let app: INestApplication;
    let traceabilityFactory: TraceabilityFactory;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TraceabilityFactory],                        
        }).compile();

        traceabilityFactory = await module.get<TraceabilityFactory>(TraceabilityFactory);        

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing Traceability Factory', () => {         

        it('Should be validate the traceability type and return TraceabilityRepository', async () => {            
            const instance = traceabilityFactory.create();

            expect(instance.constructor.name).toEqual(TraceabilityRepository.name);
        }); 
    });
});