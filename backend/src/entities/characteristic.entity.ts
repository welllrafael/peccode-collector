import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type Characteristic = {
	_id: BSON.UUID;	
	description: string;
	type: number;
	status: boolean;
};

export const buildSchemaCharacteristic = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructCharacteristic = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('Characteristic');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "description", type: "string", label: "Descrição", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "type", type: "int", label: "Tipo", maxSize: 1, mode: mode.form, pattern: '' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });	

	return builder;
}