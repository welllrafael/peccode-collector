import { BSON } from 'realm';
import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type Address = {
	_id: BSON.UUID;	
	country: number; 
	state: number; 
    county: number,
    cep: number,
    description: string,
    district: string,
    number: number,
    complement: string
};

export const buildSchemaAddress = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructAddress = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('Address');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "country", type: "int", label: "País", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "state", type: "int", label: "Estado", maxSize: 1, mode: mode.form, pattern: '' });
	builder.addField({ name: "county", type: "int", label: "Município", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "cep", type: "int", label: "CEP", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "description", type: "string", label: "Descrição", maxSize: 1, mode: mode.form, pattern: '' });
	builder.addField({ name: "district", type: "string", label: "Distrito", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "number", type: "int", label: "Número", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "complement", type: "string", label: "Complemento", maxSize: 1, mode: mode.form, pattern: '' });		
	return builder;
}