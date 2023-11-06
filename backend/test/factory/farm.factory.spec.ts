import { FarmAreaTypeRepository } from '../../src/repositories/farmAreaType.repository';
import { FarmAreaRepository } from '../../src/repositories/farmArea.repository';
import { FarmFactory } from '../../src/factory/farm.factory';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FarmRepository } from '../../src/repositories/farm.repository';
import { FarmLotTypeRepository } from '../../src/repositories/farmLotType.repository';
import { FarmSectorRepository } from '../../src/repositories/farmSector.repository';
import { FarmLotRepository } from '../../src/repositories/farmLot.repository';

describe('Farm Factory', () => {

    let app: INestApplication;
    let farmFactory: FarmFactory;     

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FarmFactory],                        
        }).compile();

        farmFactory = await module.get<FarmFactory>(FarmFactory);        

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing Farm Factory', () => {
        
        it('Should be validate the farm type doesnt exist', async () => {
            const farmRepository: string = "A";

            await expect(farmFactory.create(farmRepository)).toBe(undefined);                          
        }); 

        it('Should be validate the farm type and return FarmRepository', async () => {
            const farmRepository: string = "0";
            const instance = farmFactory.create(farmRepository);

            expect(instance.constructor.name).toEqual(FarmRepository.name);
        }); 

        it('Should be validate the farm type and return FarmAreaRepository', async () => {
            const farmAreaRepository: string = "1";
            const instance = farmFactory.create(farmAreaRepository);

            expect(instance.constructor.name).toEqual(FarmAreaRepository.name);
        }); 

        it('Should be validate the farm type and return FarmAreaTypeRepository', async () => {
            const farmAreaRepository: string = "2";
            const instance = farmFactory.create(farmAreaRepository);

            expect(instance.constructor.name).toEqual(FarmAreaTypeRepository.name);
        }); 

        it('Should be validate the farm type and return FarmLotTypeRepository', async () => {
            const farmLotTypeRepository: string = "3";
            const instance = farmFactory.create(farmLotTypeRepository);

            expect(instance.constructor.name).toEqual(FarmLotTypeRepository.name);
        }); 

        it('Should be validate the farm type and return FarmSectorRepository', async () => {
            const farmSectorRepository: string = "4";
            const instance = farmFactory.create(farmSectorRepository);

            expect(instance.constructor.name).toEqual(FarmSectorRepository.name);
        }); 

        it('Should be validate the farm type and return FarmLotRepository', async () => {
            const farmLotRepository: string = "5";
            const instance = farmFactory.create(farmLotRepository);

            expect(instance.constructor.name).toEqual(FarmLotRepository.name);
        }); 
    });
});