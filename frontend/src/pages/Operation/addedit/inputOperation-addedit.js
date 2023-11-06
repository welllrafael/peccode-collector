import { execFormPecCode } from "../../../utils/utils";

export const InputOperationAddEdit = ()=>{
  const route = "/InputOperationAddEdit";
  const typeInputOperation = "0";  

  return(execFormPecCode(route, typeInputOperation));
}