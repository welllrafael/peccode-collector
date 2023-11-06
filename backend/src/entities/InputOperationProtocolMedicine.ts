import { BSON } from "realm";

import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type InputOperationProtocolMedicine = {
	_id: BSON.UUID;    
    inputOperationHealthProtocolId: BSON.UUID; 
    medicineId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
};

export const buildSchemaInputOperationProtocolMedicine = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructInputOperationProtocolMedicine = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('InputOperationProtocolMedicine');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "inputOperationHealthProtocolId", type: "uuid", label: "Id Prot. Saúde Op.", maxSize: 240, mode: mode.form, pattern: '', constraint: 'inputOperation/all/4' });
	builder.addField({ name: "medicineId", type: "int", label: "Id Medicamento", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "quantity", type: "int", label: "Quantidade", maxSize: 240, mode: mode.form, pattern: '' });	
	builder.addField({ name: "createdAt", type: "date", label: "Dt. Criação", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "updatedAt", type: "date", label: "Dt. Atualização", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "deletedAt", type: "date", label: "Dt. Deletado", maxSize: 240, mode: mode.browse, pattern: '' });	

    return builder;
}