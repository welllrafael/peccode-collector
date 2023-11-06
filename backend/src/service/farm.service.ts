import { SelectFarmRepository } from '../repositories/pecCode.enum';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { FarmFactory } from '../factory/farm.factory';

@Injectable()
export class FarmService {
    constructor() {}

	async getById(id: string, typeFarm: string): Promise<string> {				

		let totalFarmType: number = ((Object.keys(SelectFarmRepository).length / 2) - 1);

		const validationFields = ((id, typeFarm) => {
			if(!Boolean(id) || isNaN(id)) {
				throw new HttpException("Field id is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(!Boolean(typeFarm) || isNaN(typeFarm)) {
				throw new HttpException("Field typeFarm is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeFarm) < 0 || parseInt(typeFarm) > totalFarmType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(id, typeFarm);
		
		return await this.getData(id,typeFarm)					
	}

	async getAll(typeFarm: string): Promise<string> {				

		let totalFarmType: number = ((Object.keys(SelectFarmRepository).length / 2) - 1);

		const validationFields = ((typeFarm) => {
			if(!Boolean(typeFarm) || isNaN(typeFarm)) {
				throw new HttpException("Field typeFarm is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeFarm) < 0 || parseInt(typeFarm) > totalFarmType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(typeFarm);
		
		return await this.getAllData(typeFarm)					
	}

	/* istanbul ignore next */
	async getAllData(typeFarm){
		let factory = new FarmFactory();
		let farm = factory.create(typeFarm);				

		return await farm.getAll();					
	}

	/* istanbul ignore next */
	async getData(id,typeFarm){
		let factory = new FarmFactory();
		let farm = factory.create(typeFarm);				

		return await farm.getById(id);					
	}

	/* istanbul ignore next */
	getStruct(typeFarm) {
		let factory = new FarmFactory();
		let farm = factory.create(typeFarm);

		let totalFarmType: number = ((Object.keys(SelectFarmRepository).length / 2) - 1);
		
		const validationFields = ((typeFarm) => {
			if(!Boolean(typeFarm) || isNaN(typeFarm)) {
				throw new HttpException("Field typeFarm is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeFarm) < 0 || parseInt(typeFarm) > totalFarmType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(typeFarm);

		return farm.getStruct();					
	}
}
