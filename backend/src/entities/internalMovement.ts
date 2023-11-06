import { BSON } from "realm";
import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type InternalMovement = {
	_id: BSON.UUID;	
	description: String;
	health: boolean;
	weighing: boolean;
	createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

};

export const buildSchemaInternalMovement = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructInternalMovement = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('InternalMovement');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "description", type: "string", label: "Descricao", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "health", type: "bool", label: "Saude", maxSize: 1, mode: mode.form, pattern: ''});
	builder.addField({ name: "weighing", type: "bool", label: "Pesagem", maxSize: 1, mode: mode.form, pattern: ''});
	builder.addField({ name: "createdAt", type: "date", label: "Dt. Criação", maxSize: 240, mode: mode.browse, pattern: ''});	
	builder.addField({ name: "updatedAt", type: "date", label: "Dt. Atualização", maxSize: 240, mode: mode.browse, pattern: ''});
	builder.addField({ name: "deletedAt", type: "date", label: "Dt. Deletado", maxSize: 240, mode: mode.browse, pattern: ''});
	return builder;
}