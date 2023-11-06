import { InputMovementGenericDTO } from './InputMovementGeneric.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostMovementTypeDTO extends InputMovementGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public description: string;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public type: string;

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public ageGroup: boolean;

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

export class PutMovementTypeDTO extends InputMovementGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public description: string;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public type: string;

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public ageGroup: boolean;

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

export class DeleteMovementTypeDTO extends InputMovementGenericDTO {

}