import '@fontsource/Poppins/700.css';
import { useContext } from 'react';
import { generateDataTablePecCode } from '../../utils/utils';
import UserContext from "../../context/collectorContext";

export const Animal = () => {
  const title = "Animal";
  const route = "/AnimalAddEdit";

  const headerRequest = {
    operation: "GET",
    typeCollection: "0"
  }; 


  const {setState, state} = useContext(UserContext);

  state.title = title;
  setState(state);

  return generateDataTablePecCode(title, route, headerRequest);
}