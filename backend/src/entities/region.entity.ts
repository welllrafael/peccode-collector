import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type Region = {
	_id: BSON.UUID;    
    nome: string
};

export const buildSchemaRegion = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructRegion = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('Region');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "nome", type: "string", label: "Nome", maxSize: 240, mode: mode.form, pattern: '' });
	
	return builder;
}