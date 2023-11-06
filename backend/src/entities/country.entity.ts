import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type Country = {
	_id: BSON.UUID;    
	code: number; 
    fone: string;
    iso:  string;
    iso3: string;
    nome: string;
    nomeFormal: string
};

export const buildSchemaCountry = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructCountry = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('Country');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "code", type: "int", label: "Codigo", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "fone", type: "string", label: "Fone", maxSize: 1, mode: mode.form, pattern: '' });
	builder.addField({ name: "iso", type: "string", label: "ISO", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "iso3", type: "string", label: "ISO3", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "nome", type: "string", label: "Nome", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "nomeFormal", type: "string", label: "Nome Formal", maxSize: 1, mode: mode.form, pattern: '' });

	return builder;
}