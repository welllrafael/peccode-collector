import { CollectionPecCode } from './../model/collection.model';

export interface IAddressRepository {
    getData(request: string): Promise<string>;
    getAll(): Promise<string>;
	getStruct(): CollectionPecCode;
}


export enum AddressSelectRepo {
	Address, 
    Country,
    Region,
    State,
    County
}