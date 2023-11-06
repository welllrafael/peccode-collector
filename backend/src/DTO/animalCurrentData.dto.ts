import { AnimalGenericDTO } from './AnimalGeneric.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BSON } from 'realm';

export class PostAnimalCurrentDataDTO extends AnimalGenericDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public animalId: BSON.UUID;

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public farmId: BSON.UUID; 
	
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public areaId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public picketId: number;

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public picketDate: Date;

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public areaDate: Date;
	
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public lotId: BSON.UUID; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public lotDate: Date; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public weight: number; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public weightingDate: Date;

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public healthProtocolId: number;

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public healthProtocolDate: Date;

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public quarantineDate: Date;

}

export class PutAnimalCurrentDataDTO extends AnimalGenericDTO { 


    @ApiProperty({required: true})
    @IsNotEmpty()  
	public animalId: BSON.UUID;

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public farmId: BSON.UUID; 
	
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public areaId: BSON.UUID; 

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public picketId: number;

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public picketDate: Date;

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public areaDate: Date;
	
    @ApiProperty({required: true})
    @IsNotEmpty()  
	public lotId: BSON.UUID; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public lotDate: Date; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public weight: number; 

	@ApiProperty({required: true})
    @IsNotEmpty()  
	public weightingDate: Date;

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public healthProtocolId: number;

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public healthProtocolDate: Date;

    @ApiProperty({required: true})
    @IsNotEmpty()  
	public quarantineDate: Date;

}

export class DeleteAnimalCurrentDataDTO extends AnimalGenericDTO{

}