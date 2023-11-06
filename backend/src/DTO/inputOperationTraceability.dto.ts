import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';
import { InputOperationGenericDTO } from './InputOperationGeneric.dto';

export class PostInputOperationTraceabilityDTO extends InputOperationGenericDTO {
	
    @ApiProperty({required: true})
    @IsNotEmpty()      
    public inputOperationId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()      
    public status: string;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    public protocol: string;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    public message: string;

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

export class PutInputOperationTraceabilityDTO extends InputOperationGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()      
    public inputOperationId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()      
    public status: string;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    public protocol: string;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    public message: string;

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

export class DeleteInputOperationTraceabilityDTO extends InputOperationGenericDTO {

}