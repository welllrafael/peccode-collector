import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type CharacteristicEnum = {
	_id: BSON.UUID;	
	characteristicId: BSON.UUID;	
	value: string;	
};

export const buildSchemaCharacteristicEnum = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructCharacteristicEnum = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('CharacteristicEnum');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "characteristicId", type: "uuid", label: "Id Caracteristica", maxSize: 240, mode: mode.form, pattern: '', constraint: 'breed/all/1' });
	builder.addField({ name: "value", type: "uuid", label: "Valor", maxSize: 1, mode: mode.form, pattern: '' });

	return builder;
}