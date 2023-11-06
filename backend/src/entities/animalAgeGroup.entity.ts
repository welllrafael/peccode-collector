import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";


export type AnimalAgeGroup = {
	_id: BSON.UUID;	
	description: string;
	productId: number;
	start: number;
	end: number;	
};

export const buildSchemaAnimalAgeGroup = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructAnimalAgeGroup = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('AnimalAgeGroup');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "description", type: "string", label: "Descrição", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "productId", type: "int", label: "Id Produto", maxSize: 1, mode: mode.form, pattern: '' });
	builder.addField({ name: "start", type: "int", label: "Inicio", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "end", type: "int", label: "Fim", maxSize: 240, mode: mode.form, pattern: '' });
	return builder;
}