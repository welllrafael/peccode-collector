import { AddressSelectRepo } from '../repositories/IAddressRepository.interface';
import { AddressFactory } from '../factory/address.factory';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AddressService {
    constructor() {}

	async getAddressById(typeAddress: string,addressId: string): Promise<string> {
	
		let totalAddressType: number = ((Object.keys(AddressSelectRepo).length / 2) - 1);

		const validationFields = ((addressId, typeAddress) => {
			if(!Boolean(addressId) || isNaN(addressId)) {
				throw new HttpException("Field id is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(!Boolean(typeAddress) || isNaN(typeAddress)) {
				throw new HttpException("Field typeAddress is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeAddress) < 0 || parseInt(typeAddress) > totalAddressType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(addressId,typeAddress);

		return await this.getData(typeAddress,addressId)
	}
	
	async getAll(typeAddress: string): Promise<string> {				

		let totalAddressType: number = ((Object.keys(AddressSelectRepo).length / 2) - 1);

		const validationFields = ((typeAddress) => {
			if(!Boolean(typeAddress) || isNaN(typeAddress)) {
				throw new HttpException("Field typeAddress is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeAddress) < 0 || parseInt(typeAddress) > totalAddressType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(typeAddress);
		
		return await this.getAllData(typeAddress)					
	}

	/* istanbul ignore next */
	async getAllData(type: string){
		let factory = new AddressFactory();
		let address = factory.create(type);				

		return await address.getAll();					
	}

	/* istanbul ignore next */
	async getData(type: string, addressId: string){
		let factory = new AddressFactory();
		let address = factory.create(type);

		return await address.getData(addressId);					
	}

    /* istanbul ignore next */
	getStruct(type: string){
		let factory = new AddressFactory();
		let address = factory.create(type);				

		return address.getStruct();					
	}
}
