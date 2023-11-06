import { SelectBreedRepository } from '../repositories/pecCode.enum';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BreedFactory } from '../factory/breed.factory';

@Injectable()    
export class BreedService {
    constructor() {}

	async getById(id: string, typeBreed: string): Promise<string> {
	
		let totalBreedType: number = Object.keys(SelectBreedRepository).length / 2;

		const validationFields = ((id, typeBreed) => {
			if(!Boolean(id) || isNaN(id)) {
				throw new HttpException("Field id is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(!Boolean(typeBreed) || isNaN(typeBreed)) {
				throw new HttpException("Field typeBreed is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeBreed) < 0 || parseInt(typeBreed) > totalBreedType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(id, typeBreed);
		
		return await this.getData(id,typeBreed)					
	}

	async getAll(typeBreed: string): Promise<string> {
	
		let totalBreedType: number = Object.keys(SelectBreedRepository).length / 2;

		const validationFields = ((typeBreed) => {
			if(!Boolean(typeBreed) || isNaN(typeBreed)) {
				throw new HttpException("Field typeBreed is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeBreed) < 0 || parseInt(typeBreed) > totalBreedType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(typeBreed);
		
		return await this.getAllData(typeBreed)					
	}

	/* istanbul ignore next */
	async getAllData(typeBreed){
		let factory = new BreedFactory();
		let breed = factory.create(typeBreed);				

		return await breed.getAll();					
	}

	/* istanbul ignore next */
	async getData(id,typeBreed){
		let factory = new BreedFactory();
		let breed = factory.create(typeBreed);				

		return await breed.getById(id);					
	}

	/* istanbul ignore next */
	getStruct(typeBreed) {
		let factory = new BreedFactory();
		let breed = factory.create(typeBreed);				

		return breed.getStruct();					
	}
}
