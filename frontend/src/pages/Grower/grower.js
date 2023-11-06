import '@fontsource/Poppins/700.css';
import { generateDataTablePecCode } from '../../utils/utils';
import UserContext from "../../context/collectorContext";
import { useContext } from 'react';

export const Grower = () => {
  const title = "Produtor";
  const route = "/GrowerAddEdit";

  const headerRequest = {
    operation: "GET",
    typeCollection: undefined
  };  

  const {setState, state} = useContext(UserContext);

  state.title = "Operacao de Entrada"
  setState(state);

  return generateDataTablePecCode(title, route, headerRequest);
}
