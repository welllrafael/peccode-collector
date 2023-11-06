import { AddressRepository } from '../../src/repositories/address.repository';
import { AddressService } from '../../src/service/address.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('Address Service', () => {

    let app: INestApplication;
    let addressService: AddressService;     
    let addressRepository: AddressRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AddressService, AddressRepository],                        
        }).compile();

        addressRepository = await module.get<AddressRepository>(AddressRepository);
        addressService = await module.get(AddressService);

        app = module.createNestApplication();

        await app.init();
    });

    describe('Testing fields Address service', () => {
        
        it('Should be validate the required fields', async () => {
            let id: undefined;
            let typeRepo: undefined;

            jest.spyOn(addressRepository, 'getData').mockResolvedValue(id);

            await expect(addressService.getAddressById(typeRepo, id))
            .rejects.toThrow("Field id is required and must be a number.");                
        });

        it('Should be a number in id', async () => {
            let id: string = "A";
            let typeRepo: string = "1";

            jest.spyOn(addressRepository, 'getData').mockResolvedValue(id);

            await expect(addressService.getAddressById(typeRepo, id))
            .rejects.toThrow("Field id is required and must be a number.");                
        });        

        it('Should be a number in typeRepo', async () => {
            let id: string = "000001";
            let typeRepo: string = "A";

            jest.spyOn(addressRepository, 'getData').mockResolvedValue(id);

            expect(addressService.getAddressById(typeRepo, id))
            .rejects.toThrow("Field typeAddress is required and must be a number.");                
        });                

        it('Should be validate a addressType out of range', async () => {
            let id: string = "000001";
            let typeRepo: string = "99";

            jest.spyOn(addressRepository, 'getData').mockResolvedValue(id);

            expect(addressService.getAddressById(typeRepo, id))
            .rejects.toThrow("Type out of range.");                
        });                

        it('Should be work!', async () => {
            const id: string = "000001";
            const typeRepo: string = "0";
            
            jest.spyOn(addressService, "getData").mockImplementation(() => Promise.resolve(id));       

            expect(await addressService.getAddressById(typeRepo, id)).toBe("000001");
        });                
    });
});