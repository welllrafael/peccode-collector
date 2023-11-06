import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type Grower = {
	_id: BSON.UUID;	
	name: string;
	status: boolean;
	personalIdentifier: number;
	IE: number;
	addressId: BSON.UUID;
};

export const buildSchemaGrower = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructGrower = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('Grower');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "name", type: "string", label: "Nome", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "personalIdentifier", type: "int", label: "Id Pessoal", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "IE", type: "int", label: "IE", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "addressId", type: "uuid", label: "ID Endereço", maxSize: 240, mode: mode.form, pattern: '', constraint: 'address/all/0' });
	
	return builder;
}