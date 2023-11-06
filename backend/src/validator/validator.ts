import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export const validatorDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: Object
) => {
  const realTodo = plainToClass(dto, obj);
  const errors = await validate(realTodo);
  // errors is an array of validation errors
  if (errors.length > 0) {
    return {  
              status:400,
              message: errors,
              error: "Bad Request - teste dto custom"
              
            }
  }
};