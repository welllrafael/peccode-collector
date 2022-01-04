import { DeleteAreaDTO, PostAreaDTO, PutAreaDTO } from './../DTO/area.dto';

export interface IAreaRepository {
    getAreaById(areaId: string): Promise<string>;
    postAreaById(postAreaDTO: PostAreaDTO): Promise<string>;
    putAreaById(putAreaDTO: PutAreaDTO): Promise<string>;
    deleteAreaById(deleteAreaDTO: DeleteAreaDTO): Promise<string>;
}

export interface IArea {    
    _id: string;
    _partition?: any;
    name: string;
    size: number;    
}