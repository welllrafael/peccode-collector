import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';
import { InputOperationGenericDTO } from './InputOperationGeneric.dto';

export class PostInputOperationHealthProtocolDTO extends InputOperationGenericDTO {
	
    @ApiProperty({required: true})
    @IsNotEmpty()      
    inputOperationId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()      
    healthProtocolId: number;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    aside: number;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    createdAt: Date;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    updatedAt: Date;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    deletedAt: Date;

}

export class PutInputOperationHealthProtocolDTO extends InputOperationGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()      
    inputOperationId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()      
    healthProtocolId: number;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    aside: number;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    createdAt: Date;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    updatedAt: Date;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    deletedAt: Date;

}

export class DeleteInputOperationHealthProtocolDTO extends InputOperationGenericDTO {

}