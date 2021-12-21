import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostAreaDTO {

    @IsNotEmpty()
    public nameArea: string;

    @IsNotEmpty()
    @IsNumber()
    public sizeArea: number;
}

export class PutAreaDTO {

    @IsNotEmpty()    
    public areaID: string;

    @IsNotEmpty()
    public nameArea: string;

    @IsNotEmpty()
    @IsNumber()
    public sizeArea: number;
}

export class DeleteAreaDTO {

    @IsNotEmpty()
    public areaID: string;
}