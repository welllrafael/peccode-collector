import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SisbovFactory } from '../../src/factory/sisbov.factory';
import { SisbovNumberRepository } from '../../src/repositories/sisbovNumber.repository';
import { SisbovRequestRepository } from '../../src/repositories/sisbovRequest.repository';

describe('Sisbov Factory', () => {

    let app: INestApplication;
    let sisbovFactory: SisbovFactory;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SisbovFactory],                        
        }).compile();

        sisbovFactory = await module.get<SisbovFactory>(SisbovFactory);        

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing Sisbov Factory', () => {
        
        it('Should be validate the sisbov type doesnt exist', async () => {
            const sisbovRepository: string = "A";

            await expect(sisbovFactory.create(sisbovRepository)).toBe(undefined);                          
        }); 

        it('Should be validate the sisbov type and return SisbovNumberRepository', async () => {
            const sisbovNumberRepository: string = "0";
            const instance = sisbovFactory.create(sisbovNumberRepository);

            expect(instance.constructor.name).toEqual(SisbovNumberRepository.name);
        }); 

        it('Should be validate the sisbov type and return SisbovRequestRepository', async () => {
            const sisbovRequestRepository: string = "1";
            const instance = sisbovFactory.create(sisbovRequestRepository);

            expect(instance.constructor.name).toEqual(SisbovRequestRepository.name);
        }); 
    });
});