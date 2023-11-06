/* istanbul ignore file */
import { AnimalBuilder } from '../builder/animalBuilder';
import { isFieldForm, getBrowseStruct, getData, postData } from './RequestData';

const animalDataProvider = async(headerRequest, data, collections) => {

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
    
    const data = await getData(`animal/all/${headerRequest.typeCollection}`);
    const struct = await getData(`animal/struct/${headerRequest.typeCollection}`);
    const structBrowse = getBrowseStruct(struct);
    const structForm = struct.fields.filter((field) => isFieldForm(field.mode));

    return {data:data,structBrowse:structBrowse,structForm:structForm};
}

const postDataContext = async (headerRequest, data, collections) => {     
    let result = {};
    
    try {
        AnimalBuilder(data, collections);                
        result = await postData(`animal/${headerRequest.typeCollection}`, data);      
    } catch (error) {
        console.log(error.message);
        result = {status: 400, message: error.message};
    }    
    return result;
}

export const MainAnimalDataProvider = {
    animalDataProvider
}