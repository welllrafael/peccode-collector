import { SelectSisbovRepository } from '../repositories/pecCode.enum';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SisbovFactory } from '../factory/sisbov.factory';

@Injectable()
export class SisbovService {
    constructor() {}

	async getById(id: string, typeSisbov: string): Promise<string> {				

		let totalSisbovType: number = ((Object.keys(SelectSisbovRepository).length / 2) - 1);

		const validationFields = ((id, typeSisbov) => {
			if(!Boolean(id) || isNaN(id)) {
				throw new HttpException("Field id is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(!Boolean(typeSisbov) || isNaN(typeSisbov)) {
				throw new HttpException("Field typeSisbov is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeSisbov) < 0 || parseInt(typeSisbov) > totalSisbovType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(id, typeSisbov);
		
		return await this.getData(id, typeSisbov)					
	}
	
	async getAll(typeSisbov: string): Promise<string> {				

		let totalSisbovType: number = ((Object.keys(SelectSisbovRepository).length / 2) - 1);

		const validationFields = ((typeSisbov) => {
			if(!Boolean(typeSisbov) || isNaN(typeSisbov)) {
				throw new HttpException("Field typeSisbov is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeSisbov) < 0 || parseInt(typeSisbov) > totalSisbovType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(typeSisbov);
		
		return await this.getAllData(typeSisbov);
	}

	/* istanbul ignore next */
	async getAllData(typeSisbov){
		let factory = new SisbovFactory();
		let sisbov = factory.create(typeSisbov);				

		return await sisbov.getAll();					
	}

	/* istanbul ignore next */
	async getData(id,typeSisbov){
		let factory = new SisbovFactory();
		let sisbov = factory.create(typeSisbov);				

		return await sisbov.getById(id);					
	}

	/* istanbul ignore next */
	getStruct(typeSisbov) {
		let factory = new SisbovFactory();
		let sisbov = factory.create(typeSisbov);
		
		let totalSisbovType: number = ((Object.keys(SelectSisbovRepository).length / 2) - 1);

		const validationFields = ((typeSisbov) => {
			if(!Boolean(typeSisbov) || isNaN(typeSisbov)) {
				throw new HttpException("Field typeSisbov is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeSisbov) < 0 || parseInt(typeSisbov) > totalSisbovType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(typeSisbov);

		return sisbov.getStruct();					
	}
}
