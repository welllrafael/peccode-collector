import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';

export class PostIdvDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public animalId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public status: boolean;

}

export class PutIdvDTO {

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

export class DeleteIdvDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public id: BSON.UUID; 

}