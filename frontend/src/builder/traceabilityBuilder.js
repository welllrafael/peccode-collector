export const TraceabilityBuilder = (data, collections) => {    
    InsertUUIDFieldControl(data);
    ResolveArrayFromSelect(data);        
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