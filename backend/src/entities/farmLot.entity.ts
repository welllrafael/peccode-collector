import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type FarmLot = {
	_id: BSON.UUID;	
	farmId: BSON.UUID; 
	lotTypeId: BSON.UUID; 
	areaId: BSON.UUID; 
	description: string; 
	status: boolean;
	sex: sex;
	lotStatus: lotStatus;
	date: string
};

export enum sex{
	Macho = 'M',
	Femea = 'F'
}

export enum lotStatus{
	Iniciado = 'I',
	Aberto = 'A',
	Fechado = 'F'
}

export const buildSchemaFarmLot = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructFarmLot = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('FarmLot');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "farmId", type: "uuid", label: "Id Fazenda", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "lotTypeId", type: "uuid", label: "Id Tipo Lote", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "areaId", type: "uuid", label: "Id Area", maxSize: 240, mode: mode.form, pattern: '', constraint: 'farm/all/1' });	
	builder.addField({ name: "description", type: "string", label: "Descrição", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "sex", type: "string", label: "Sexo", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "lotStatus", type: "string", label: "Status Lote", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "date", type: "date", label: "Date", maxSize: 240, mode: mode.form, pattern: '' });
	
	return builder;
}