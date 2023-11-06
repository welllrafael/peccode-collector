import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type InputOperationHealthProtocol = {
	_id: BSON.UUID;    
    inputOperationId: BSON.UUID; 
    healthProtocolId: number;
    aside: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
};

export const buildSchemaInputOperationHealthProtocol = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructInputOperationHealthProtocol = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('InputOperationHealthProtocol');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "inputOperationId", type: "uuid", label: "Id Operação", maxSize: 240, mode: mode.form, pattern: '', constraint: 'inputOperation/all/0' });
	builder.addField({ name: "healthProtocolId", type: "int", label: "Id Prot. Saúde", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "aside", type: "int", label: "A Parte", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "createdAt", type: "date", label: "Dt. Criação", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "updatedAt", type: "date", label: "Dt. Atualização", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "deletedAt", type: "date", label: "Dt. Deletado", maxSize: 240, mode: mode.browse, pattern: '' });
	
	return builder;
}