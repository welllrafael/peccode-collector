import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type County = {
	_id: BSON.UUID;    
    nome: string;
	state: string
};

export const buildSchemaCounty = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructCounty = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('County');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "nome", type: "string", label: "Nome", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "state", type: "string", label: "Estado", maxSize: 1, mode: mode.form, pattern: '' });

	return builder;
}