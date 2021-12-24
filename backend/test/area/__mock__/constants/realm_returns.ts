import { IArea } from './../../../../src/repository/IAreaRepository.interface';

export const fakeReturn: IArea = {
    _id: "61c4e4551cd81b4dbf8ee1e3",
    _partition: null,
    name: "Area de teste mocada",
    size: 100
}

export const fakeReturnDelete: IArea = {
    _id: "",
    _partition: null,
    name: "",
    size: 0
}

export const fakeReturnUpdate: IArea = {
    _id: "61c4e4551cd81b4dbf8ee1e3",
    _partition: null,
    name: "Update area mock",
    size: 1000
}