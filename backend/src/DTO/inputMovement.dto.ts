import { InputMovementGenericDTO } from './InputMovementGeneric.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostInputMovementDTO extends InputMovementGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public description: string;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public identification: boolean;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public registration: boolean;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public health: boolean;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public weighing: boolean;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public gta: boolean;

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

export class PutInputMovementDTO extends InputMovementGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public description: string;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public identification: boolean;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public registration: boolean;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public health: boolean;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public weighing: boolean;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public gta: boolean;

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

export class DeleteInputMovementDTO extends InputMovementGenericDTO {

}