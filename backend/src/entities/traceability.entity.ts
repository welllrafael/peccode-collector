import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type Traceability = {
	_id: BSON.UUID;
	sisbovNumber: number; 
	animalId: BSON.UUID; 
	farmId: BSON.UUID; 
	manejo: number; 
	sisbovDate: Date; 
	solNumber: number; 
	cotaHiltonDate: Date; 
	slaughterReleaseDate: Date; 
	status: boolean; 
	obs: string
};

export const buildSchemaTraceability = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructTraceability = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('Traceability'); 

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "sisbovNumber", type: "int", label: "Num. Sisbov", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "animalId", type: "uuid", label: "Id Animal", maxSize: 240, mode: mode.form, pattern: '', constraint: 'animal/all/0', keyConstraint: '_id' });
	builder.addField({ name: "farmId", type: "uuid", label: "Id Fazenda", maxSize: 240, mode: mode.form, pattern: '', constraint: 'farm/all/0', keyConstraint: 'description' });	
	builder.addField({ name: "manejo", type: "int", label: "Manejo", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "sisbovDate", type: "date", label: "Dt. Sisbov", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "solNumber", type: "int", label: "Num. Solic.", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "cotaHiltonDate", type: "date", label: "Data Cota", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "slaughterReleaseDate", type: "date", label: "Data Abate", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "obs", type: "string", label: "Observação", maxSize: 240, mode: mode.form, pattern: '' });
	
	return builder;
}