import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type InputOperation = {
	_id: BSON.UUID;    
    farmId: BSON.UUID;
    animalInputMovementId: BSON.UUID;
    farmGrowerId: BSON.UUID;
    quantity: number;
    obs: string;
    operationStatus: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
};

export const buildSchemaInputOperation = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructInputOperation = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('InputOperation');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: ''});
	builder.addField({ name: "animalInputMovementId", type: "uuid", label: "Id Mov Animal", maxSize: 240, mode: mode.form, pattern: '', constraint: 'movement/all/0', keyConstraint: 'description' });
	builder.addField({ name: "farmId", type: "uuid", label: "Id Fazenda", maxSize: 240, mode: mode.form, pattern: '', constraint: 'farm/all/0', keyConstraint: 'description' });
	builder.addField({ name: "farmGrowerId", type: "uuid", label: "Id Produtor", maxSize: 240, mode: mode.browse, pattern: '', constraint: 'grower/all', keyConstraint: '_id' });	
	builder.addField({ name: "quantity", type: "int", label: "Quantidade", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "obs", type: "string", label: "Observação", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "operationStatus", type: "string", label: "Status", maxSize: 240, mode: mode.browse, pattern: ''});
	builder.addField({ name: "createdAt", type: "date", label: "Dt. Criação", maxSize: 240, mode: mode.browse, pattern: ''});	
	builder.addField({ name: "updatedAt", type: "date", label: "Dt. Atualização", maxSize: 240, mode: mode.browse, pattern: ''});
	builder.addField({ name: "deletedAt", type: "date", label: "Dt. Deletado", maxSize: 240, mode: mode.browse, pattern: ''});
	
	return builder;
}