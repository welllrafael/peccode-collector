import { Injectable } from '@nestjs/common';
import { AreaFactory } from '../factory/area.factory';

@Injectable()
export class AreaService {
    constructor() {}

	async getArea(): Promise<string> {

		let payloadArea: object;
		let factory = new AreaFactory();
		let area = factory.create(payloadArea);
		return await area.getArea();					
	}

	async postArea(): Promise<string> {		

		let payloadArea: object;
		let factory = new AreaFactory();
		let area = factory.create(payloadArea);
		return await area.postArea();					
	}

	async putArea(): Promise<string> {

		let payloadArea: object;
		let factory = new AreaFactory();
		let area = factory.create(payloadArea);
		return await area.putArea();					
	}

	async deleteArea(): Promise<string> {

		let payloadArea: object;
		let factory = new AreaFactory();
		let area = factory.create(payloadArea);
		return await area.deleteArea();					
	}
}
