import { DeleteIdeDTO, PostIdeDTO, PutIdeDTO } from '../dto/ide.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IdeFactory } from '../factory/ide.factory';
import { IdeRepository } from 'src/repositories/ide.repository';

@Injectable()
export class IdeService {
    constructor() {}

	async getById(ideId: string): Promise<string> {
	
		const validationFields = ((ideId) => {
			if(!Boolean(ideId)) {
				throw new HttpException("Field ideId is required.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(ideId);

		return await this.getData(ideId)
	}

	async getAll(): Promise<string> {
		return await this.getAllData()
	}

	async update(ideData: PutIdeDTO): Promise<string> {
		return await this.putData(ideData)
	}

	async create(ideData: PostIdeDTO): Promise<string> {
		return await this.postData(ideData)
	}

	async delete(ideData: DeleteIdeDTO): Promise<string> {
		return await this.deleteData(ideData)
	}

	/* istanbul ignore next */
	async deleteData(ideData: DeleteIdeDTO): Promise<string> {
		let factory = new IdeFactory();
		let ide = factory.create();

		return await ide.delete(ideData);					
	}

	/* istanbul ignore next */
	async putData(ideData: PutIdeDTO): Promise<string> {
		let factory = new IdeFactory();
		let ide = factory.create();

		return await ide.update(ideData);					
	}

	/* istanbul ignore next */
	async postData(ideData: PostIdeDTO): Promise<string> {
		let factory = new IdeFactory();
		let ide = factory.create();

		return await ide.create(ideData);					
	}

	/* istanbul ignore next */
	async getAllData(){
		let factory = new IdeFactory();
		let ide = factory.create();

		return await ide.getAll();					
	}

	/* istanbul ignore next */
	async getData(ideId: string){
		let factory = new IdeFactory();
		let ide = factory.create();

		return await ide.getById(ideId);					
	}

	/* istanbul ignore next */
	getStruct(){
		let factory = new IdeFactory();
		let ide = factory.create();				

		return ide.getStruct();					
	}
}
