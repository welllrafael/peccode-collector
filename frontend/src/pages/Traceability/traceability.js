import '@fontsource/Poppins/700.css';
import { useContext } from 'react';
import { generateDataTablePecCode } from '../../utils/utils';
import UserContext from "../../context/collectorContext";

export const Traceability = () => {
  const title = "Traceability";
  const route = "/TraceabilityAddEdit";
  const headerRequest = {
    operation: "GET",
    typeCollection: undefined
  };  
  
  const {setState, state} = useContext(UserContext);

  state.title = title;
  setState(state);

  return generateDataTablePecCode(title, route, headerRequest);
}