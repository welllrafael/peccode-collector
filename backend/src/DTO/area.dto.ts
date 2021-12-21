import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostAreaDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()    
    public nameArea: string;

    @ApiProperty({required: true})
    @IsNumber()
    public sizeArea: number;
}

export class PutAreaDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()    
    public areaID: string;

    @ApiProperty()
    @IsNotEmpty()
    public nameArea: string;
    
    @ApiProperty()
    @IsNumber()
    public sizeArea: number;
}

export class DeleteAreaDTO {

    @ApiProperty({required: true})
    @IsNotEmpty()
    public areaID: string;
}