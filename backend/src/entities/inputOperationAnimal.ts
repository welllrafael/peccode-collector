import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type InputOperationAnimal = {
	_id: BSON.UUID;    
    inputOperationId: BSON.UUID; 
    animalId: BSON.UUID;
    aside: number;
    inputGtaId: BSON.UUID; 
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
};

export const buildSchemaInputOperationAnimal = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructInputOperationAnimal = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('InputOperationAnimal');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "inputOperationId", type: "uuid", label: "Id Op Entrada", maxSize: 240, mode: mode.form, pattern: '', constraint: 'inputOperation/all/0' });
	builder.addField({ name: "animalId", type: "uuid", label: "Id Animal", maxSize: 240, mode: mode.form, pattern: '', constraint: 'animal/all/0' });
	builder.addField({ name: "aside", type: "int", label: "A Parte", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "inputGtaId", type: "uuid", label: "GTA", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "createdAt", type: "date", label: "Dt. Criação", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "updatedAt", type: "date", label: "Dt. Atualização", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "deletedAt", type: "date", label: "Dt. Deletado", maxSize: 240, mode: mode.browse, pattern: '' });	
	
	return builder;
}