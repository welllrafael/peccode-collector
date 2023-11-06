import { execFormPecCode } from '../../../utils/utils';

export const AnimalAddEdit = ()=>{
  const route = "/AnimalAddEdit";
  const typeAnimalOperation = "0"; 

  return(execFormPecCode(route, typeAnimalOperation));
}