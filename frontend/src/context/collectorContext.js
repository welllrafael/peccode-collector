import { React, createContext } from "react";

//Valor default do contexto
const DEFAULT_VALUE = {
    state: {
        name: "",
        lastName: "",
        email: "",
        title: "Pec Code Collector"
    },
    setState: () => {}, //função de inicialização
};

const UserContext = createContext(DEFAULT_VALUE);

export default UserContext;
