import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type AnimalCurrentData = {
	_id: BSON.UUID;	
	animalId: BSON.UUID;
	farmId: BSON.UUID; 
	areaId: BSON.UUID; 
	areaDate: Date; 
	picketId: number;
	picketDate: Date; 
	lotId: BSON.UUID; 
	lotDate: Date; 
	weight: number; 
	weightingDate: Date 
	healthProtocolId: number; 
	healthProtocolDate: Date; 
	quarantineDate: Date
};

export const buildSchemaAnimalCurrentData = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructAnimalCurrentData = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('AnimalCurrentData');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "animalId", type: "uuid", label: "Id Animal", maxSize: 240, mode: mode.form, pattern: '', constraint: 'animal/all/0' });
	builder.addField({ name: "farmId", type: "uuid", label: "Id Fazenda", maxSize: 1, mode: mode.form, pattern: '', constraint: 'farm/all/0' });
	builder.addField({ name: "areaId", type: "uuid", label: "Id Area", maxSize: 240, mode: mode.form, pattern: '', constraint: 'farm/all/1' });	
	builder.addField({ name: "areaDate", type: "date", label: "Data Área", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "picketId", type: "int", label: "Id Picket", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "picketDate", type: "date", label: "Data Picket", maxSize: 1, mode: mode.form, pattern: '' });
	builder.addField({ name: "lotId", type: "uuid", label: "Id Lote", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "lotDate", type: "date", label: "Data Lote", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "weight", type: "int", label: "Peso", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "weightingDate", type: "date", label: "Data Peso", maxSize: 1, mode: mode.form, pattern: '' });
	builder.addField({ name: "healthProtocolId", type: "int", label: "Id Protocolo de Saúde", maxSize: 240, mode: mode.form, pattern: '' });			
	builder.addField({ name: "healthProtocolDate", type: "date", label: "Data Protocolo Saúde", maxSize: 1, mode: mode.form, pattern: '' });
	builder.addField({ name: "quarantineDate", type: "date", label: "Data Quarentena", maxSize: 240, mode: mode.form, pattern: '' });				
	
	return builder;
}