import { AnimalGenericDTO } from './AnimalGeneric.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';

export class PostAnimalCharacteristicDTO extends AnimalGenericDTO {


    @ApiProperty({required: true})
    @IsNotEmpty()  
	public characteristicId: BSON.UUID; 
	
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public animalId: BSON.UUID; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public value: string;

}

export class PutAnimalCharacteristicDTO extends AnimalGenericDTO{


    @ApiProperty({required: true})
    @IsNotEmpty()  
	public characteristicId: BSON.UUID; 
	
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public animalId: BSON.UUID; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public value: string;

}

export class DeleteAnimalCharacteristicDTO extends AnimalGenericDTO{

}