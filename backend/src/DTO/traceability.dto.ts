import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';

export class PostTraceabilityDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public sisbovNumber: number; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public animalId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public farmId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public manejo: number; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public sisbovDate: Date; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public solNumber: number; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public cotaHiltonDate: Date; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public slaughterReleaseDate: Date; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public status: boolean; 

    @ApiProperty({required: false})    
    @IsNotEmpty()  
	public obs: string

}

export class PutTraceabilityDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public id: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public sisbovNumber: number; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public animalId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public farmId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public manejo: number; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public sisbovDate: Date; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public solNumber: number; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public cotaHiltonDate: Date; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public slaughterReleaseDate: Date; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public status: boolean; 

    @ApiProperty({required: false})   
    @IsNotEmpty()   
	public obs: string

}

export class DeleteTraceabilityDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
    public id: BSON.UUID; 

}