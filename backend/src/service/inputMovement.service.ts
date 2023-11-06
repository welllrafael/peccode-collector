import { verbs } from '../factory/generic.factory';
import { InputMovementFactory } from '../factory/movement.factory';
import { SelectInputMovementRepository } from '../repositories/pecCode.enum';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InputMovementGenericDTO } from 'src/dto/InputMovementGeneric.dto';
import { MovementFactoryDto } from 'src/factory/movementDto.factory';
import { validatorDto } from 'src/validator/validator';

@Injectable()
export class InputMovementService {
    constructor() {}

	async getById(id: string, typeInputMovement: string): Promise<string> {				

		let totalInputMovementType: number = ((Object.keys(SelectInputMovementRepository).length / 2) - 1);

		const validationFields = ((id, typeInputMovement) => {
			if(!Boolean(id)) {
				throw new HttpException("Field id is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(!Boolean(typeInputMovement) || isNaN(typeInputMovement)) {
				throw new HttpException("Field typeInputMovement is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeInputMovement) < 0 || parseInt(typeInputMovement) > totalInputMovementType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(id, typeInputMovement);
		
		return await this.getData(id,typeInputMovement)					
	}

	async getAll(typeInputMovement: string): Promise<string> {				

		let totalInputMovementType: number = ((Object.keys(SelectInputMovementRepository).length / 2) - 1);

		const validationFields = ((typeInputMovement) => {
			if(!Boolean(typeInputMovement)) {
				throw new HttpException("Field typeInputMovement is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeInputMovement) < 0 || parseInt(typeInputMovement) > totalInputMovementType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(typeInputMovement);
		
		return await this.getAllData(typeInputMovement)					
	}

	async update(movementData: InputMovementGenericDTO, type: string): Promise<string> {
		return await this.putData(movementData, type)
	}

	async create(movementData: InputMovementGenericDTO, type: string): Promise<string> {
		return await this.postData(movementData, type)
	}

	async delete(movementData: InputMovementGenericDTO, type: string): Promise<string> {
		return await this.deleteData(movementData, type)
	}

	/* istanbul ignore next */
	async deleteData(movementData: InputMovementGenericDTO, type: string): Promise<string> {
		let factory = new InputMovementFactory();
		let repo = factory.create(type);

		const error = await this.validateDto(movementData, repo.constructor.name, verbs.del)

		if(error){
			return JSON.stringify(error)
		}


		return await repo.delete(movementData);					
	}

	/* istanbul ignore next */
	async putData(movementData: InputMovementGenericDTO, type: string): Promise<string> {
		let factory = new InputMovementFactory();
		let repo = factory.create(type);

		const error = await this.validateDto(movementData, repo.constructor.name, verbs.put)

		if(error){
			return JSON.stringify(error)
		}

		return await repo.update(movementData);					
	}

	/* istanbul ignore next */
	async postData(movementData: InputMovementGenericDTO, type: string): Promise<string> {
		let factory = new InputMovementFactory();
		let repo = factory.create(type);

		const error = await this.validateDto(movementData, repo.constructor.name, verbs.post)

		if(error){
			return JSON.stringify(error)
		}

		return await repo.create(movementData);					
	}

	/* istanbul ignore next */
	async getAllData(typeInputMovement){
		let factory = new InputMovementFactory();
		let inputMovement = factory.create(typeInputMovement);				

		return await inputMovement.getAll();					
	}

	/* istanbul ignore next */
	async getData(id,typeInputMovement){
		let factory = new InputMovementFactory();
		let inputMovement = factory.create(typeInputMovement);				

		return await inputMovement.getById(id);					
	}

	/* istanbul ignore next */
	getStruct(typeInputMovement) {
		let factory = new InputMovementFactory();
		let inputMovement = factory.create(typeInputMovement);

		let totalInputMovementType: number = ((Object.keys(SelectInputMovementRepository).length / 2) - 1);
		
		const validationFields = ((typeInputMovement) => {
			if(!Boolean(typeInputMovement) || isNaN(typeInputMovement)) {
				throw new HttpException("Field typeInputMovement is required and must be a number.", HttpStatus.BAD_REQUEST);
			} else if(parseInt(typeInputMovement) < 0 || parseInt(typeInputMovement) > totalInputMovementType) {
				throw new HttpException("Type out of range.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(typeInputMovement);

		return inputMovement.getStruct();					
	}

	async validateDto(movementData: InputMovementGenericDTO, 
		movementType: string,
		verb: number) {

		const dtoFactory = new MovementFactoryDto(movementType, verb);
		const dto = dtoFactory.getDto();
		return await validatorDto(dto, movementData);
	}
}
