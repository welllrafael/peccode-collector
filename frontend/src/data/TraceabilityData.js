/* istanbul ignore file */
import { compose } from '@mui/system';
import { TraceabilityBuilder } from '../builder/traceabilityBuilder';
import { isFieldForm, getBrowseStruct, getData, postData } from './RequestData';

const traceabilityDataProvider = async(headerRequest, data, collections) => {

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
    
    const data = await getData(`traceability/all`);
    const struct = await getData(`traceability/struct`);
    const structBrowse = getBrowseStruct(struct);
    const structForm = struct.fields.filter((field) => isFieldForm(field.mode));

    return {data:data,structBrowse:structBrowse,structForm:structForm};
}

const postDataContext = async (headerRequest, data, collections) => {     
    let result = {};
    try {        
        TraceabilityBuilder(data, collections);                
        result = await postData(`traceability`, data);      
    } catch (error) {
        console.log(error.message);
        result = {status: 400, message: error.message};
    }    
    return result;
}

export const MainTraceabilityDataProvider = {
    traceabilityDataProvider
}