import { IViewRepository } from './IViewRepository.interface';

export interface IRepository extends IViewRepository {
    create(data: object): Promise<string>;
    update(data: object): Promise<string>;
    delete(data: object): Promise<string>;
}
