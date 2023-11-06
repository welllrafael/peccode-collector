import { BSON } from "realm";
import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type Ide = {
	_id: BSON.UUID;		
	animalId: BSON.UUID; 
	status: boolean;
};

export const buildSchemaIde = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructIde = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('Ide');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "animalId", type: "uuid", label: "AnimalId", maxSize: 240, mode: mode.form, pattern: '', constraint: 'animal/all/0' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 1, mode: mode.form, pattern: '' });
	return builder;
}
