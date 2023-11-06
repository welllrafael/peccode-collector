import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type Farm = {
	_id: BSON.UUID;	
	description: string; 
	farmType: farmType; 
	personalIdentifier: number; 
	IE: number; 
	status: boolean; 
	tracked: boolean; 
	establishmentCode: number; 
	erasCode: number; 
	nirfinc: number; 
	growerId: BSON.UUID;
};

export enum farmType {
	Fazenda_Grupo = '1',
	Fazendo_CliFor = '2'
}

export const buildSchemaFarm = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructFarm = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('Farm');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "description", type: "string", label: "Descrição", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "farmType", type: "string", label: "Tipo Fazenda", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "personalIdentifier", type: "int", label: "ID Pessoal", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "IE", type: "int", label: "IE", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "tracked", type: "bool", label: "Monitorado", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "establishmentCode", type: "int", label: "Cod Estabelecimento", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "erasCode", type: "int", label: "Cod Era", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "nirfinc", type: "int", label: "NIRF", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "growerId", type: "uuid", label: "Produtor", maxSize: 240, mode: mode.form, pattern: '', constraint: 'grower/all' });

	return builder;
}