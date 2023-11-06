import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type FarmAreaType = {
	_id: BSON.UUID;	
	description: string; 
	status: boolean;
};

export const buildSchemaFarmAreaType = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructFarmAreaType = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('FarmAreaType');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "description", type: "string", label: "Descrição", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });

	return builder;
}