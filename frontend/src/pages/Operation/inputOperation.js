import React, { useContext } from "react";
import '@fontsource/Poppins/700.css';
import { generateDataTablePecCodeWithSubtitle } from '../../utils/utils';
import PriorityHigh from '@material-ui/icons/PriorityHigh';
import UserContext from "../../context/collectorContext";

export const InputOperation = () => {
    const title = "Operacao de Entrada";
    const route = "/InputOperationAddEdit";
    const headerRequest = {
        operation: "GET",
        typeCollection: "0"
      };    

    const {setState, state} = useContext(UserContext);

    state.title = "Operacao de Entrada"
    setState(state);

    const subtitle = [
        {
            description: "Aberta",      
            icon: <PriorityHigh />
        },
        {
            description: "Coletando",      
            icon: <PriorityHigh />
        },
        {
            description: "Finalizada",      
            icon: <PriorityHigh />
        }
    ];
    
    return generateDataTablePecCodeWithSubtitle(title, route, subtitle, headerRequest);
} 