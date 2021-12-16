import { Injectable } from '@nestjs/common';
import { Object } from 'realm';
import { AreaFactory } from '../factory/area.factory';

@Injectable()
export class AreaService {
    constructor() {}

	getArea(): void {}

	postArea(): void {
		if(true){
			var teste: object;
			var factory = new AreaFactory();
			var area = factory.create(teste);
			area.postArea();			
		}
	}

	putArea(): void {}

	deleteArea(): void {}
}
