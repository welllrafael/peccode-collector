import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type State = {
	_id: BSON.UUID;
    codigoUF: number;
    UF: string;
    nome: string;
    regiao: number;
};

export const buildSchemaState = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructState = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('State');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "codigoUF", type: "int", label: "Cod. UF", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "UF", type: "string", label: "UF", maxSize: 1, mode: mode.form, pattern: '' });
	builder.addField({ name: "nome", type: "string", label: "Nome", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "regiao", type: "int", label: "Região", maxSize: 240, mode: mode.form, pattern: '' });
	
	return builder;
}