import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';

export class AnimalGenericDTO {
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public id: BSON.UUID; 
}