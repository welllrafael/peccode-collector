import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type SisbovRequest = {
	_id: BSON.UUID;
	requestNumber: number;
	farmId: BSON.UUID;
	requestDate: Date;
	initialSISBOV: number;
	finalSISBOV: number;
};

export const buildSchemaSisbovRequest = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructSisbovRequest = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('SisbovRequest');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "requestNumber", type: "int", label: "Num. Requisição", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "farmId", type: "uuid", label: "Id Fazenda", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "requestDate", type: "date", label: "Dt. Requisição", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "initialSISBOV", type: "int", label: "SISBOV Inicial", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "finalSISBOV", type: "int", label: "SISBOV Final", maxSize: 240, mode: mode.form, pattern: '' });

	return builder;
}