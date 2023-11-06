import { BSON } from "realm";
import { structBuilder } from "../builder/struct.builder";
import { mode } from "../model/fieldSettings.model";

export type Animal = {
	_id: BSON.UUID;	
	farmId: BSON.UUID; 
	breedId: BSON.UUID; 
	sex: sex;
	status: boolean; 
	farmGrowerId: BSON.UUID; 
	birthDate: Date; 
	inputDate: Date;
};

export enum sex {
	Masculino = "M",
	Feminino = "F"
}

export const buildSchemaAnimal = () => {
    const builder = loadStruct();

	return builder.getSchema()
}

export const buildStructAnimal = () => {
    const builder = loadStruct();

	return builder.getStruct()
}

function loadStruct() {
	const builder = new structBuilder('Animal');

	builder.addField({ name: "_id", type: "uuid", label: "Id", maxSize: 240, mode: mode.browse, pattern: '' });
	builder.addField({ name: "farmId", type: "uuid", label: "Id Fazenda", maxSize: 240, mode: mode.form, pattern: '', constraint: 'farm/all/0', keyConstraint: 'description' });
	builder.addField({ name: "breedId", type: "uuid", label: "Id Procria", maxSize: 1, mode: mode.form, pattern: '', constraint: 'breed/all/0', keyConstraint: 'description' });
	builder.addField({ name: "sex", type: "string", label: "Sexo", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "status", type: "bool", label: "Status", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "farmGrowerId", type: "uuid", label: "Id Agricultor", maxSize: 1, mode: mode.browse, pattern: '', constraint: 'grower/all', keyConstraint: '_id' });
	builder.addField({ name: "birthDate", type: "date", label: "Nascimento", maxSize: 240, mode: mode.form, pattern: '' });
	builder.addField({ name: "inputDate", type: "date", label: "Entrada", maxSize: 240, mode: mode.form, pattern: '' });	
	return builder;
}