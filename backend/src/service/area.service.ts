import { PostAreaDTO, PutAreaDTO, DeleteAreaDTO } from './../DTO/area.dto';
import { Injectable } from '@nestjs/common';
import { AreaFactory } from '../factory/area.factory';

@Injectable()
export class AreaService {
    constructor() {}

	async getAreaById(areaId: string): Promise<string> {

		let payloadArea: object;
		let factory = new AreaFactory();
		let area = factory.create(payloadArea);
		return await area.getAreaById(areaId);					
	}

	async postAreaById(postAreaDTO: PostAreaDTO): Promise<string> {		

		let payloadArea: object;
		let factory = new AreaFactory();
		let area = factory.create(payloadArea);
		return await area.postAreaById(postAreaDTO);					
	}

	async putAreaById(putAreaDTO: PutAreaDTO): Promise<string> {

		let payloadArea: object;
		let factory = new AreaFactory();
		let area = factory.create(payloadArea);
		return await area.putAreaById(putAreaDTO);					
	}

	async deleteAreaById(deleteAreaDTO: DeleteAreaDTO): Promise<string> {

		let payloadArea: object;
		let factory = new AreaFactory();
		let area = factory.create(payloadArea);
		return await area.deleteAreaById(deleteAreaDTO);					
	}
}
