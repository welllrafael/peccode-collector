export enum SelectSisbovRepository {
	SisbovNumber, 
	SisbovRequest
}

export enum SisbovNumberEnum {
	Ativo,
	Inativo
}

export enum SelectAnimalRepository {
	Animal, 	
	AnimalCharacteristic,
	AnimalCurrentData	
}

export enum SelectBreedRepository {
	Breed, 
	Characteristic,
	CharacteristicEnum
}

export enum SelectFarmRepository {
	Farm, 
	FarmArea,
	FarmAreaType,
	FarmLotType,
	FarmSector,
	FarmLot
}

export enum SelectInputOperationRepository {
	InputOperation, 
	InputOperationAnimal,
	InputOperationTraceability,
	InputOperationHealthProtocol,
	InputOperationProtocolMedicine
}

export enum SelectInputMovementRepository {
	InputMovement,
	MovementType, 
	InternalMovement,
	OutputMovement
}