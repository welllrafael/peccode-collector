export const AnimalBuilder = (data, collections) => {    
    InsertUUIDFieldControl(data);
    ResolveArrayFromSelect(data);        
    InsertGrower(data, collections);    
}

const InsertUUIDFieldControl = (data) => {
    data["id"] = "218c517f-e1b2-435a-bfa1-68abeec25438";
}

const ResolveArrayFromSelect = (data) => {    
    Object.keys(data).forEach((item) => {
        if (Array.isArray(data[item])) {
            data[item] = data[item][0];
        }
    });
}

const InsertGrower = (data, collections) => {    
    data["farmGrowerId"] = getGrowerFromContext(data, collections);
    data["farmId"] = data.farmId;
    data["breedId"] = data.breedId;
}

const getGrowerFromContext = (data, collections) => {          
    const farmContext = collections.find((collection) => collection.name.includes("farm"));
    const farmSelected = farmContext.data.find((farm) => farm._id === data.farmId);
    return farmSelected.growerId;
}