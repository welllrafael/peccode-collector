import { InputOperationGenericDTO } from './InputOperationGeneric.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';

export class PostInputOperationAnimalDTO extends InputOperationGenericDTO {
	
    @ApiProperty({required: true})
    @IsNotEmpty()  
    public inputOperationId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public animalId: BSON.UUID;

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public aside: number;

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public inputGtaId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public createdAt: Date;

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public updatedAt: Date;

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public deletedAt: Date;

}

export class PutInputOperationAnimalDTO extends InputOperationGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public inputOperationId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public animalId: BSON.UUID;

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public aside: number;

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public inputGtaId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public createdAt: Date;

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public updatedAt: Date;

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public deletedAt: Date;

}

export class DeleteInputOperationAnimalDTO extends InputOperationGenericDTO {

}