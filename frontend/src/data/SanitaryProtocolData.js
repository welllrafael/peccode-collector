/* istanbul ignore file */
import { isFieldForm, getBrowseStruct, getData } from './RequestData';

const sanitaryProtocolDataProvider = async(headerRequest) => {
    return await getDataContext(headerRequest);
}

const getDataContext = async (headerRequest) => {
    
    const data = await getData(`inputOperation/all/${headerRequest.typeCollection}`);        
    const struct = await getData(`inputOperation/struct/${headerRequest.typeCollection}`);
    const structBrowse = getBrowseStruct(struct);
    const structForm = struct.fields.filter((field) => isFieldForm(field.mode));

    return {data:data,structBrowse:structBrowse,structForm:structForm};
}

export const MainSanitaryProtocolDataProvider = {
    sanitaryProtocolDataProvider
}