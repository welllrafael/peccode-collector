import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GrowerFactory } from '../factory/grower.factory';

@Injectable()
export class GrowerService {
    constructor() {}

	async getById(growerId: string): Promise<string> {
	
		const validationFields = ((growerId) => {
			if(!Boolean(growerId) || isNaN(growerId)) {
				throw new HttpException("Field growerId is required and must be a number.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(growerId);

		return await this.getData(growerId)
	}

	async getAll(): Promise<string> {	
		return await this.getAllData()
	}

	/* istanbul ignore next */
	async getAllData(){
		let factory = new GrowerFactory();
		let grower = factory.create();

		return await grower.getAll();					
	}

	/* istanbul ignore next */
	async getData(growerId: string){
		let factory = new GrowerFactory();
		let grower = factory.create();

		return await grower.getById(growerId);					
	}

	/* istanbul ignore next */
	getStruct(){
		let factory = new GrowerFactory();
		let grower = factory.create();				

		return grower.getStruct();					
	}
}
