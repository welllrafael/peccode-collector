import { fieldSettings } from '../model/fieldSettings';
import genericContext from './Data';

export const getBrowseStruct = (struct) => {
    const newStruct = struct.fields;    
    
    let result = [];
    newStruct.forEach((field,index) => {                
        result.push(new fieldSettings(field.name, field.label, 10, "right", false, false),)            
    });

    result.push(new fieldSettings('', '', 10, "right", false, true),)

    return result
}

export const isFieldForm = (mode) => {
    return mode === 1;
}

export const getData = async (url) => {
    const {axiosInstance, config} = await genericContext();    
    const data = (await axiosInstance.get(`/api/v1/${url}`, config)).data;

    return data;
}

export const postData = async (url, data) => {
    
    const {axiosInstance, config} = await genericContext();        
    const result = (await axiosInstance.post(`/api/v1/${url}`, data, config));

    return result;
}