import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type FarmSector = {
	_id: BSON.UUID;	
	farmId: BSON.UUID; 
	description: string; 
	status: boolean;
	latitude: number;
	longitude:number;
};

export const buildSchemaFarmSector = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructFarmSector = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('FarmSector');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "farmId", type: "uuid", label: "Id Fazenda", maxSize: 240, mode: mode.form, pattern: '', constraint: 'farm/all/0' });
	builder.addField({ name: "description", type: "string", label: "Descrição", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "latitude", type: "int", label: "Latitude", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "longitude", type: "int", label: "Longitude", maxSize: 240, mode: mode.form, pattern: '' });
	
	return builder;
}