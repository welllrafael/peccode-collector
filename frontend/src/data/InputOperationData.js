/* istanbul ignore file */
import { InputOperationBuilder } from '../builder/inputOperationBuilder';
import { isFieldForm, getBrowseStruct, getData, postData } from './RequestData';

const inputOperationDataProvider = async(headerRequest, data, collections) => {
    
    switch (headerRequest.operation) {
        case "POST":
            return await postDataContext(headerRequest, data, collections);
            break;    

        default:
            return await getDataContext(headerRequest);       
            break;
    }    
}

const getDataContext = async (headerRequest) => {
    
    const data = await getData(`inputOperation/all/${headerRequest.typeCollection}`);
    const struct = await getData(`inputOperation/struct/${headerRequest.typeCollection}`);
    const structBrowse = getBrowseStruct(struct);
    const structForm = struct.fields.filter((field) => isFieldForm(field.mode));

    return {data:data,structBrowse:structBrowse,structForm:structForm};
}

const postDataContext = async (headerRequest, data, collections) => { 
    let result = {};
    
    try {
        InputOperationBuilder(data, collections);
        result = await postData(`inputOperation/${headerRequest.typeCollection}`, data);      
    } catch (error) {
        console.log(error.message);
        result = {status: 400, message: error.message};
    }    
    return result;
}

export const MainInputOperationDataProvider = {
    inputOperationDataProvider
}