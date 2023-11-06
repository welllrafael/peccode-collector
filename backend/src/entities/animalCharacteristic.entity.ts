import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type AnimalCharacteristic = {
	_id: BSON.UUID;	
	characteristicId: BSON.UUID; 
	animalId: BSON.UUID; 
	value: string;
};

export const buildSchemaAnimalCharacteristic = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructAnimalCharacteristic = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('AnimalCharacteristic');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "characteristicId", type: "uuid", label: "Id Característica", maxSize: 240, mode: mode.form, pattern: '', constraint: 'breed/all/1' });
	builder.addField({ name: "animalId", type: "uuid", label: "Id Animal", maxSize: 1, mode: mode.form, pattern: '', constraint: 'animal/all/0' });
	builder.addField({ name: "value", type: "string", label: "Valor", maxSize: 240, mode: mode.form, pattern: '' });	
	return builder;
}