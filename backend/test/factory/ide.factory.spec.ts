import { IdeRepository } from '../../src/repositories/ide.repository';
import { IdeFactory } from '../../src/factory/ide.factory';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('Ide Factory', () => {

    let app: INestApplication;
    let ideFactory: IdeFactory;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [IdeFactory],                        
        }).compile();

        ideFactory = await module.get<IdeFactory>(IdeFactory);        

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing Ide Factory', () => {         

        it('Should be validate the ide type and return IdeRepository', async () => {            
            const instance = ideFactory.create();

            expect(instance.constructor.name).toEqual(IdeRepository.name);
        }); 
    });
});