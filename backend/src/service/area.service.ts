import { PostAreaDTO, PutAreaDTO, DeleteAreaDTO } from './../DTO/area.dto';
import { Injectable } from '@nestjs/common';
import { AreaFactory } from '../factory/area.factory';

@Injectable()
export class AreaService {
    constructor() {}

	async getAreaById(areaId: string): Promise<string> {
	
		let factory = new AreaFactory();
		let area = factory.create();
		return await area.getAreaById(areaId);					
	}

	async postAreaById(postAreaDTO: PostAreaDTO): Promise<string> {		

		let factory = new AreaFactory();
		let area = factory.create();
		return await area.postAreaById(postAreaDTO);					
	}

	async putAreaById(putAreaDTO: PutAreaDTO): Promise<string> {

		let factory = new AreaFactory();
		let area = factory.create();
		return await area.putAreaById(putAreaDTO);					
	}

	async deleteAreaById(deleteAreaDTO: DeleteAreaDTO): Promise<string> {
		
		let factory = new AreaFactory();
		let area = factory.create();
		return await area.deleteAreaById(deleteAreaDTO);					
	}

	async deleteAllArea(): Promise<string> {
		
		let factory = new AreaFactory();
		let area = factory.create();
		return await area.deleteAllArea();					
	}	
}
