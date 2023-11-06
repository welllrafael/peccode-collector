import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type InputOperationTraceability = {
	_id: BSON.UUID;    
    inputOperationId: BSON.UUID; 
    status: string;
    protocol: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
};

export const buildSchemaInputOperationTraceability = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructInputOperationTraceability = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('InputOperationTraceability');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "inputOperationId", type: "uuid", label: "Id Operação", maxSize: 240, mode: mode.form, pattern: '', constraint: 'inputOperation/all/0' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "protocol", type: "string", label: "Protocolo", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "message", type: "string", label: "Mensagem", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "createdAt", type: "date", label: "Dt. Criação", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "updatedAt", type: "date", label: "Dt. Atualização", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "deletedAt", type: "date", label: "Dt. Deletado", maxSize: 240, mode: mode.browse, pattern: '' });		
	
    return builder;
}