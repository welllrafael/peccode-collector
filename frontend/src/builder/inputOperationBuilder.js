export const InputOperationBuilder = (data, collections) => {
    InsertDateFieldsControl(data);
    InsertUUIDFieldControl(data);
    ResolveArrayFromSelect(data);
    InsertStatusField(data);
    InsertGrower(data, collections);    
}

const InsertDateFieldsControl = (data) => {
    data["createdAt"] = Date(Date.now());
    data["updatedAt"] = Date(Date.now());
    data["deletedAt"] = Date(Date.now());
}

const InsertUUIDFieldControl = (data) => {
    data["id"] = "218c517f-e1b2-435a-bfa1-68abeec25438";
}

const ResolveArrayFromSelect = (data) => {    
    Object.keys(data).forEach((item) => {
        if (Array.isArray(data[item])) {
            data[item] = data[item][0]
        }
    });
}

const InsertStatusField = (data) => {
    data["operationStatus"] = "Ativo";
}

const InsertGrower = (data, collections) => {        
    data["farmGrowerId"] = getGrowerFromContext(data, collections);
}

const getGrowerFromContext = (data, collections) => {           
    const farmContext = collections.find((collection) => collection.name.includes("farm"));
    const farmSelected = farmContext.data.find((farm) => farm._id === data.farmId);
    return farmSelected.growerId;
}