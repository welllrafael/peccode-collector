/* istanbul ignore file */
import { isFieldForm, getBrowseStruct, getData } from './RequestData';

const sisbovRequestDataProvider = async(headerRequest) => {
    return await getDataContext(headerRequest);
}

const getDataContext = async (headerRequest) => {
    
    const data = await getData(`sisbov/all/${headerRequest.typeCollection}`);
    const struct = await getData(`sisbov/struct/${headerRequest.typeCollection}`);
    const structBrowse = getBrowseStruct(struct);
    const structForm = struct.fields.filter((field) => isFieldForm(field.mode));

    return {data:data,structBrowse:structBrowse,structForm:structForm};
}

export const MainSisbovRequestDataProvider = {
    sisbovRequestDataProvider
}