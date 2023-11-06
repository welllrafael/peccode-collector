import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';

export class PostIdeDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public animalId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public status: boolean;

}

export class PutIdeDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public id: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public animalId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public status: boolean;

}

export class DeleteIdeDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public id: BSON.UUID; 

}