import { BSON } from "realm";

export type AreaTest = {
	_id: BSON.ObjectId;
	_partition?: string;
	name: string;
	size: string;
};

export const AreaTestSchema = {
	name: 'AreaTest',
	properties: {
		_id: 'objectId',
		_partition: 'string?',
		name: 'string',
		size: 'string'
	},
	primaryKey: '_id'
};