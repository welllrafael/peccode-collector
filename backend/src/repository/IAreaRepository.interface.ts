export interface IAreaRepository {
    getArea(): Promise<string>;
    postArea(): Promise<string>;
    putArea(): Promise<string>;
    deleteArea(): Promise<string>;
}