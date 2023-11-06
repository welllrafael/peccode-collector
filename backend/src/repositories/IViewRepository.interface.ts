import { CollectionPecCode } from './../model/collection.model';
import { ObjectSchema } from "realm";

export interface IViewRepository {
    getById(id: string): Promise<string>;
    getAll(): Promise<string>;
	getStruct(): CollectionPecCode;
}