import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type FarmArea = {
	_id: BSON.UUID;	
	farmId: BSON.UUID;	
	areaTypeId: BSON.UUID;	
	farmSectorId: BSON.UUID;	
	description: string; 
	status: boolean;
};

export const buildSchemaFarmArea = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructFarmArea = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder("FarmArea");

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "farmId", type: "uuid", label: "Id Fazenda", maxSize: 240, mode: mode.form, pattern: '', constraint: 'farm/all/0' });
	builder.addField({ name: "areaTypeId", type: "uuid", label: "Id Tipo Area", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "farmSectorId", type: "uuid", label: "Id Setor", maxSize: 240, mode: mode.form, pattern: '', constraint: 'farm/all/4' });	
	builder.addField({ name: "description", type: "string", label: "Descrição", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });
	
	return builder;
}