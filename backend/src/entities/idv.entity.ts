import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type Idv = {
	_id: BSON.UUID;		
	animalId: BSON.UUID; 
	status: boolean;
};

export const buildSchemaIdv = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructIdv = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('Idv');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "animalId", type: "uuid", label: "Id Animal", maxSize: 240, mode: mode.form, pattern: '', constraint: 'animal/all/0' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 1, mode: mode.form, pattern: '' });
	
	return builder;
}