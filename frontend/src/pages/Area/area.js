import '@fontsource/Poppins/700.css';
import { useContext } from 'react';
import { generateDataTablePecCode } from '../../utils/utils';
import UserContext from "../../context/collectorContext";

export const Area = () => {
  const title = "Area Fazenda";
  const route = "/FarmAddEdit";

  const headerRequest = {
    operation: "GET",
    typeCollection: "1"
  }; 

  const {setState, state} = useContext(UserContext);

  state.title = title;
  setState(state);

  return generateDataTablePecCode(title, route, headerRequest);
}
