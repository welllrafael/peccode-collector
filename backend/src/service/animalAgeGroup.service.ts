
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SelectAnimalRepository } from '../repositories/pecCode.enum';
import { AnimalAgeGroupFactory } from '../factory/animalAgeGroup.factory';


@Injectable()
export class AnimalAgeGroupService {
    constructor() {}

	async getById(id: string): Promise<string> {
	
		let totalAnimalType: number = Object.keys(SelectAnimalRepository).length / 2;

		const validationFields = ((id) => {
			if(!Boolean(id)) {
				throw new HttpException("Field id is required.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(id);

		
		return await this.getData(id)					
	}

	async getAll(): Promise<string> {		
		return await this.getAllData()					
	}

	/* istanbul ignore next */
	async getAllData(){
		let factory = new AnimalAgeGroupFactory();
		let animal = factory.create();

		return await animal.getAll();					
	}

	/* istanbul ignore next */
	async getData(id: string){
		let factory = new AnimalAgeGroupFactory();
		let animal = factory.create();

		return await animal.getById(id);					
	}

	/* istanbul ignore next */
	getStruct() {
		let factory = new AnimalAgeGroupFactory();
		let animal = factory.create();				

		return animal.getStruct();					
	}
}
