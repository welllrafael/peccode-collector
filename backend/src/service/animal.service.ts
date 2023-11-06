import { verbs } from '../factory/generic.factory';
import { AnimalGenericDTO } from '../dto/AnimalGeneric.dto';
import { validatorDto } from '../validator/validator';
import { DeleteAnimalDTO } from '../dto/animal.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SelectAnimalRepository } from '../repositories/pecCode.enum';

import { AnimalFactory } from '../factory/animal.factory';
import { AnimalFactoryDto } from 'src/factory/animalDto.factory';


@Injectable()
export class AnimalService {
    constructor() {}

	async getById(id: string, typeAnimalRepository: string): Promise<string> {
	
		let totalAnimalType: number = ((Object.keys(SelectAnimalRepository).length / 2) - 1);

		const validationFields = ((id, typeAnimalRepository) => {
			if(!Boolean(id)) {
				throw new HttpException("Field id is required.", HttpStatus.BAD_REQUEST);
			} else if(!Boolean(typeAnimalRepository) || isNaN(typeAnimalRepository)) {
				throw new HttpException("Field typeAnimal is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeAnimalRepository) < 0 || parseInt(typeAnimalRepository) > totalAnimalType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(id, typeAnimalRepository);

		
		return await this.getData(id, typeAnimalRepository)					
	}

	async getAll(typeAnimalRepository: string): Promise<string> {
	
		let totalAnimalType: number = ((Object.keys(SelectAnimalRepository).length / 2) - 1);

		const validationFields = ((typeAnimalRepository) => {
			if(!Boolean(typeAnimalRepository)) {
				throw new HttpException("Field typeAnimal is required.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeAnimalRepository) < 0 || parseInt(typeAnimalRepository) > totalAnimalType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(typeAnimalRepository);

		
		return await this.getAllData(typeAnimalRepository)					
	}

	async update(animalData: AnimalGenericDTO, type: string): Promise<string> {
		return await this.putData(animalData, type)
	}

	async create(animalData: AnimalGenericDTO, type: string): Promise<string> {
		return await this.postData(animalData, type)
	}

	async delete(animalData: DeleteAnimalDTO, type: string): Promise<string> {
		return await this.deleteData(animalData, type)
	}

	/* istanbul ignore next */
	async deleteData(animalData: DeleteAnimalDTO, type: string): Promise<string> {
		let factory = new AnimalFactory();
		let repo = factory.create(type);

		const error = await this.validateDto(animalData, repo.constructor.name, verbs.del)

		if(error){
			return JSON.stringify(error)
		}


		return await repo.delete(animalData);					
	}

	/* istanbul ignore next */
	async putData(animalData: AnimalGenericDTO, type: string): Promise<string> {
		let factory = new AnimalFactory();
		let repo = factory.create(type);

		const error = await this.validateDto(animalData, repo.constructor.name, verbs.put)

		if(error){
			return JSON.stringify(error)
		}

		return await repo.update(animalData);					
	}

	/* istanbul ignore next */
	async postData(animalData: AnimalGenericDTO, type: string): Promise<string> {
		let factory = new AnimalFactory();
		let repo = factory.create(type);

		const error = await this.validateDto(animalData, repo.constructor.name, verbs.post)

		if(error){
			return JSON.stringify(error)
		}

		return await repo.create(animalData);					
	}	

	/* istanbul ignore next */
	async getAllData(type: string){
		let factory = new AnimalFactory();
		let animal = factory.create(type);

		return await animal.getAll();					
	}

	/* istanbul ignore next */
	async getData(id: string, type: string){
		let factory = new AnimalFactory();
		let animal = factory.create(type);

		return await animal.getById(id);					
	}

	/* istanbul ignore next */
	getStruct(typeAnimal) {

		let totalAnimalType: number = ((Object.keys(SelectAnimalRepository).length / 2) - 1);

		const validationFields = ((typeAnimalRepository) => {
			if(!Boolean(typeAnimalRepository)) {
				throw new HttpException("Field typeAnimal is required.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeAnimalRepository) < 0 || parseInt(typeAnimalRepository) > totalAnimalType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(typeAnimal);

		let factory = new AnimalFactory();
		let animal = factory.create(typeAnimal);				

		return animal.getStruct();					
	}

	async validateDto(animalData: AnimalGenericDTO, 
		animalType: string,
		verb: number) {

		const dtoFactory = new AnimalFactoryDto(animalType, verb);
		const dto = dtoFactory.getDto();
		return await validatorDto(dto, animalData);
	}
}
