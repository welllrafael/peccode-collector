/* istanbul ignore file */
import { isFieldForm, getBrowseStruct, getData } from './RequestData';

const growerDataProvider = async(headerRequest) => {
    return await getDataContext(headerRequest);
}

const getDataContext = async (headerRequest) => {
    
    const data = await getData(`grower/all`);
    const struct = await getData(`grower/struct`);
    const structBrowse = getBrowseStruct(struct);
    const structForm = struct.fields.filter((field) => isFieldForm(field.mode));

    return {data:data,structBrowse:structBrowse,structForm:structForm};
}

export const MainGrowerDataProvider = {
    growerDataProvider
}