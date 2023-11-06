import { PostIdvDTO, PutIdvDTO, DeleteIdvDTO } from '../dto/idv.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IdvFactory } from '../factory/idv.factory';

@Injectable()
export class IdvService {
    constructor() {}

	async getById(idvId: string): Promise<string> {
	
		const validationFields = ((idvId) => {
			if(!Boolean(idvId)) {
				throw new HttpException("Field idvId is required.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(idvId);

		return await this.getData(idvId)
	}
	
	async getAll(): Promise<string> {	
		return await this.getAllData()
	}

	async update(idvData: PutIdvDTO): Promise<string> {
		return await this.putData(idvData)
	}

	async create(idvData: PostIdvDTO): Promise<string> {
		return await this.postData(idvData)
	}

	async delete(idvData: DeleteIdvDTO): Promise<string> {
		return await this.deleteData(idvData)
	}

	/* istanbul ignore next */
	async deleteData(idvData: DeleteIdvDTO): Promise<string> {
		let factory = new IdvFactory();
		let idv = factory.create();

		return await idv.delete(idvData);					
	}

	/* istanbul ignore next */
	async putData(idvData: PutIdvDTO): Promise<string> {
		let factory = new IdvFactory();
		let idv = factory.create();

		return await idv.update(idvData);					
	}

	/* istanbul ignore next */
	async postData(idvData: PostIdvDTO): Promise<string> {
		let factory = new IdvFactory();
		let idv = factory.create();

		return await idv.create(idvData);					
	}

	/* istanbul ignore next */
	async getAllData(){
		let factory = new IdvFactory();
		let idv = factory.create();

		return await idv.getAll();					
	}

	/* istanbul ignore next */
	async getData(idvId: string){
		let factory = new IdvFactory();
		let idv = factory.create();

		return await idv.getById(idvId);					
	}

	/* istanbul ignore next */
	getStruct(){
		let factory = new IdvFactory();
		let idv = factory.create();				

		return idv.getStruct();					
	}
}
