import { createContext } from "react";

//Valor default do contexto
const DEFAULT_VALUE = {
    collections: [],
    setCollections: () => {}, //função de inicialização
};

const SelectContext = createContext(DEFAULT_VALUE);

export default SelectContext;
