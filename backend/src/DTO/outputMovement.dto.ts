import { InputMovementGenericDTO } from './InputMovementGeneric.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostOutputMovementDTO extends InputMovementGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public description: string;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public exportSale: boolean;

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

export class PutOutputMovementDTO extends InputMovementGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public description: string;

	@ApiProperty({required: true})
    @IsNotEmpty()  
    public exportSale: boolean;

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

export class DeleteOutputMovementDTO extends InputMovementGenericDTO {

}