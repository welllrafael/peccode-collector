import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class GenericFactory <T> {
    constructor() {}

	abstract create(value: object): T;
 
}