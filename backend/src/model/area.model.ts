import { BSON } from "realm";

export type Area = {
	_id: BSON.ObjectId;
	_partition?: string;
	name: string;
	size: string;
};

export const AreaSchema = {
	name: 'Area',
	properties: {
		_id: 'objectId',
		_partition: 'string?',
		name: 'string',
		size: 'string'
	},
	primaryKey: '_id'
};