import { BSON } from "realm";
import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type MovementType = {
	_id: BSON.UUID;	
	description: String;
	type: MovementTypeEnum;
	ageGroup: boolean;
	createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

};

export const buildSchemaMovementType = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructMovementType = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('MovementType');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "description", type: "string", label: "Descricao", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "type", type: "string", label: "Tipo Mov.", maxSize: 1, mode: mode.form, pattern: ''});
	builder.addField({ name: "ageGroup", type: "bool", label: "Idade do Grupo", maxSize: 1, mode: mode.form, pattern: ''});
	builder.addField({ name: "createdAt", type: "date", label: "Dt. Criação", maxSize: 240, mode: mode.browse, pattern: ''});	
	builder.addField({ name: "updatedAt", type: "date", label: "Dt. Atualização", maxSize: 240, mode: mode.browse, pattern: ''});
	builder.addField({ name: "deletedAt", type: "date", label: "Dt. Deletado", maxSize: 240, mode: mode.browse, pattern: ''});
	return builder;
}

export enum MovementTypeEnum {
	Entrada = 'E',
	Interno = 'I',
	Saida = 'S'
}