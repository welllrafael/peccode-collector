import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';

export class InputOperationGenericDTO {
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public id: BSON.UUID; 
}