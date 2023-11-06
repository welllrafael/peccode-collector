import { InputOperationFactoryDto, verbs } from '../factory/inputOperationDto.factory';
import { InputOperationGenericDTO } from '../dto/InputOperationGeneric.dto';
import { InputOperationFactory } from '../factory/inputOperation.factory';
import { validatorDto } from '../validator/validator';
import { DeleteInputOperationDTO } from '../dto/inputOperation.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SelectInputOperationRepository } from '../repositories/pecCode.enum';

@Injectable()
export class InputOperationService {
    constructor() {}

	async getById(id: string, typeInputOperationRepository: string): Promise<string> {
	
		let totalInputOperationType: number = ((Object.keys(SelectInputOperationRepository).length / 2) - 1);

		const validationFields = ((id, typeInputOperationRepository) => {
			if(!Boolean(id)) {
				throw new HttpException("Field id is required.", HttpStatus.BAD_REQUEST);
			} else if(!Boolean(typeInputOperationRepository) || isNaN(typeInputOperationRepository)) {
				throw new HttpException("Field typeInputOperation is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeInputOperationRepository) < 0 || parseInt(typeInputOperationRepository) > totalInputOperationType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(id, typeInputOperationRepository);

		
		return await this.getData(id, typeInputOperationRepository)					
	}

	async getAll(typeInputOperationRepository: string): Promise<string> {
	
		let totalInputOperationType: number = ((Object.keys(SelectInputOperationRepository).length / 2) - 1);

		const validationFields = ((typeInputOperationRepository) => {
			if(!Boolean(typeInputOperationRepository)) {
				throw new HttpException("Field typeInputOperation is required.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeInputOperationRepository) < 0 || parseInt(typeInputOperationRepository) > totalInputOperationType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(typeInputOperationRepository);

		
		return await this.getAllData(typeInputOperationRepository)					
	}

	async update(inputOperationData: InputOperationGenericDTO, type: string): Promise<string> {
		return await this.putData(inputOperationData, type)
	}

	async create(inputOperationData: InputOperationGenericDTO, type: string): Promise<string> {
		return await this.postData(inputOperationData, type)
	}

	async delete(inputOperationData: DeleteInputOperationDTO, type: string): Promise<string> {
		return await this.deleteData(inputOperationData, type)
	}

	/* istanbul ignore next */
	async deleteData(inputOperationData: DeleteInputOperationDTO, type: string): Promise<string> {
		let factory = new InputOperationFactory();
		let repo = factory.create(type);

		const error = await this.validateDto(inputOperationData, repo.constructor.name, verbs.del)

		if(error){
			return JSON.stringify(error)
		}


		return await repo.delete(inputOperationData);					
	}

	/* istanbul ignore next */
	async putData(inputOperationData: InputOperationGenericDTO, type: string): Promise<string> {
		let factory = new InputOperationFactory();
		let repo = factory.create(type);

		const error = await this.validateDto(inputOperationData, repo.constructor.name, verbs.put)

		if(error){
			return JSON.stringify(error)
		}

		return await repo.update(inputOperationData);					
	}

	/* istanbul ignore next */
	async postData(inputOperationData: InputOperationGenericDTO, type: string): Promise<string> {
		let factory = new InputOperationFactory();
		let repo = factory.create(type);

		const error = await this.validateDto(inputOperationData, repo.constructor.name, verbs.post)

		if(error){
			return JSON.stringify(error)
		}

		return await repo.create(inputOperationData);					
	}	

	/* istanbul ignore next */
	async getAllData(type: string){
		let factory = new InputOperationFactory();
		let inputOperation = factory.create(type);

		return await inputOperation.getAll();					
	}

	/* istanbul ignore next */
	async getData(id: string, type: string){
		let factory = new InputOperationFactory();
		let inputOperation = factory.create(type);

		return await inputOperation.getById(id);					
	}

	/* istanbul ignore next */
	getStruct(typeInputOperation) {

		let totalInputOperationType: number = ((Object.keys(SelectInputOperationRepository).length / 2) - 1);

		const validationFields = ((typeInputOperationRepository) => {
			if(!Boolean(typeInputOperationRepository)) {
				throw new HttpException("Field typeInputOperation is required.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeInputOperationRepository) < 0 || parseInt(typeInputOperationRepository) > totalInputOperationType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(typeInputOperation);

		let factory = new InputOperationFactory();
		let inputOperation = factory.create(typeInputOperation);				

		return inputOperation.getStruct();					
	}

	async validateDto(inputOperationData: InputOperationGenericDTO, 
		inputOperationType: string,
		verb: number) {

		const dtoFactory = new InputOperationFactoryDto(inputOperationType, verb);
		const dto = dtoFactory.getDto();
		return await validatorDto(dto, inputOperationData);
	}
}
