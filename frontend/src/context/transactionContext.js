import { createContext } from "react";

//Valor default do contexto
const DEFAULT_VALUE = {
    transaction: {
        success: false,
        id: ""
    },
    setTransaction: () => {}, //função de inicialização
};

const TransactionContext = createContext(DEFAULT_VALUE);

export default TransactionContext;