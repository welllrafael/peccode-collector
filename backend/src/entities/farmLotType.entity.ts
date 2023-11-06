import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type FarmLotType = {
	_id: BSON.UUID;
	description: string; 
	status: boolean
};

export const buildSchemaFarmLotType = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructFarmLotType = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('FarmLotType');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "description", type: "string", label: "Descrição", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });
	
	return builder;
}