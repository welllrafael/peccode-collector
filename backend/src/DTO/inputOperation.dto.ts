import { InputOperationGenericDTO } from './InputOperationGeneric.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';

export class PostInputOperationDTO extends InputOperationGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public farmId: BSON.UUID;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public animalInputMovementId: BSON.UUID;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public farmGrowerId: BSON.UUID;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public quantity: number;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public obs: string;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public operationStatus: string;

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

export class PutInputOperationDTO extends InputOperationGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public farmId: BSON.UUID;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public animalInputMovementId: BSON.UUID;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public farmGrowerId: BSON.UUID;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public quantity: number;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public obs: string;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public operationStatus: string;

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

export class DeleteInputOperationDTO extends InputOperationGenericDTO {

}