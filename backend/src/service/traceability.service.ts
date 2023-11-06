import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DeleteTraceabilityDTO, PostTraceabilityDTO, PutTraceabilityDTO } from '../dto/traceability.dto';
import { TraceabilityFactory } from '../factory/traceability.factory';

@Injectable()
export class TraceabilityService {
    constructor() {}

	async getById(traceabilityId: string): Promise<string> {
	
		const validationFields = ((traceabilityId) => {
			if(!Boolean(traceabilityId)) {
				throw new HttpException("Field traceabilityId is required.", HttpStatus.BAD_REQUEST);
			}
		});

		validationFields(traceabilityId);

		return await this.getData(traceabilityId)
	}

	async getAll(): Promise<string> {	
		return await this.getAllData()
	}

	async update(traceabilityData: PutTraceabilityDTO): Promise<string> {
		return await this.putData(traceabilityData)
	}

	async create(traceabilityData: PostTraceabilityDTO): Promise<string> {
		return await this.postData(traceabilityData)
	}

	async delete(traceabilityData: DeleteTraceabilityDTO): Promise<string> {
		return await this.deleteData(traceabilityData)
	}

	/* istanbul ignore next */
	async deleteData(traceabilityData: DeleteTraceabilityDTO): Promise<string> {
		let factory = new TraceabilityFactory();
		let traceability = factory.create();

		return await traceability.delete(traceabilityData);					
	}

	/* istanbul ignore next */
	async putData(traceabilityData: PutTraceabilityDTO): Promise<string> {
		let factory = new TraceabilityFactory();
		let traceability = factory.create();

		return await traceability.update(traceabilityData);					
	}

	/* istanbul ignore next */
	async postData(traceabilityData: PostTraceabilityDTO): Promise<string> {
		let factory = new TraceabilityFactory();
		let traceability = factory.create();

		return await traceability.create(traceabilityData);					
	}

	/* istanbul ignore next */
	async getAllData(){
		let factory = new TraceabilityFactory();
		let traceability = factory.create();

		return await traceability.getAll();					
	}

	/* istanbul ignore next */
	async getData(traceabilityId: string){
		let factory = new TraceabilityFactory();
		let traceability = factory.create();

		return await traceability.getById(traceabilityId);					
	}

	/* istanbul ignore next */
	getStruct(){
		let factory = new TraceabilityFactory();
		let traceability = factory.create();				

		return traceability.getStruct();					
	}
}
