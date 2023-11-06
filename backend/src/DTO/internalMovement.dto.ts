import { InputMovementGenericDTO } from './InputMovementGeneric.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostInternalMovementDTO extends InputMovementGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public description: string;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public health: boolean;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public weighing: boolean;

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

export class PutInternalMovementDTO extends InputMovementGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public description: string;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public health: boolean;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public weighing: boolean;

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

export class DeleteInternalMovementDTO extends InputMovementGenericDTO {

}