import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class GenericFactory <T> {
    constructor() {}

	abstract create(value: string): T;
 
}

export enum verbs {
    post,
    put,
    del
}