import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type Breed = {
	_id: BSON.UUID;	
	description: string;
	breedTypeId: number;
	status: number;
	certifierId: number;
};

export const buildSchemaBreed = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructBreed = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('Breed');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "description", type: "string", label: "Descrição", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "breedTypeId", type: "int", label: "Tipo de Raça", maxSize: 1, mode: mode.form, pattern: '' });
	builder.addField({ name: "status", type: "int", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "certifierId", type: "int", label: "Id Certificadora", maxSize: 240, mode: mode.form, pattern: '' });

	return builder;
}