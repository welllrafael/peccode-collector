import { AnimalGenericDTO } from './AnimalGeneric.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';

export class PostAnimalDTO extends AnimalGenericDTO {
	
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public farmId: BSON.UUID; 
	
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public breedId: BSON.UUID; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public sex: string;
	
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public status: boolean; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public farmGrowerId: BSON.UUID; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public birthDate: Date; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public inputDate: Date;

}

export class PutAnimalDTO extends AnimalGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public farmId: BSON.UUID; 
	
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public breedId: BSON.UUID; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public sex: string;
	
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public status: boolean; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public farmGrowerId: BSON.UUID; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public birthDate: Date; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public inputDate: Date;

}

export class DeleteAnimalDTO extends AnimalGenericDTO {

}