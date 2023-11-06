import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';
import { InputOperationGenericDTO } from './InputOperationGeneric.dto';

export class PostInputOperationProtocolMedicineDTO extends InputOperationGenericDTO {
	
    @ApiProperty({required: true})
    @IsNotEmpty()      
    inputOperationHealthProtocolId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()      
    medicineId: number;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    quantity: number;

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

export class PutInputOperationProtocolMedicineDTO extends InputOperationGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()      
    inputOperationHealthProtocolId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()      
    medicineId: number;

    @ApiProperty({required: true})
    @IsNotEmpty()      
    quantity: number;

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

export class DeleteInputOperationProtocolMedicineDTO extends InputOperationGenericDTO {

}