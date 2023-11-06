import { BSON } from "realm";
import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type OutputMovement = {
	_id: BSON.UUID;	
	description: String;
	exportSale: boolean;
	weighing: boolean;
	gta: boolean;
	ageGroup: boolean;
	createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

};

export const buildSchemaOutputMovement = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructOutputMovement = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('OutputMovement');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "description", type: "string", label: "Descricao", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "exportSale", type: "bool", label: "Exporta Venda", maxSize: 1, mode: mode.form, pattern: ''});
	builder.addField({ name: "weighing", type: "bool", label: "Pesagem", maxSize: 1, mode: mode.form, pattern: ''});
	builder.addField({ name: "gta", type: "bool", label: "GTA", maxSize: 1, mode: mode.form, pattern: ''});
	builder.addField({ name: "ageGroup", type: "bool", label: "Idade do Grupo", maxSize: 1, mode: mode.form, pattern: ''});
	builder.addField({ name: "createdAt", type: "date", label: "Dt. Criação", maxSize: 240, mode: mode.browse, pattern: ''});	
	builder.addField({ name: "updatedAt", type: "date", label: "Dt. Atualização", maxSize: 240, mode: mode.browse, pattern: ''});
	builder.addField({ name: "deletedAt", type: "date", label: "Dt. Deletado", maxSize: 240, mode: mode.browse, pattern: ''});
	return builder;
}