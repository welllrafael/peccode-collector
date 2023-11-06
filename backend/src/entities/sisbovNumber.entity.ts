import { SisbovNumberEnum } from '../repositories/pecCode.enum';
import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type SisbovNumber = {
	_id: BSON.UUID;
	sisbovNumber: number;
	requestNumber: number;
	status: SisbovNumberEnum;
	ide: string;	
};

export const buildSchemaSisbovNumber = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructSisbovNumber = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('SisbovNumber');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "sisbovNumber", type: "int", label: "Num. Sisbov", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "requestNumber", type: "int", label: "Num. Requisição", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "status", type: "int", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "ide", type: "string", label: "Ide", maxSize: 240, mode: mode.form, pattern: '' });
	
	return builder;
}