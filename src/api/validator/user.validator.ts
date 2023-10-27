import Joi from "@hapi/joi";
import {loginRegisterValidation,requiredStringValidation } from "./common";
//item joi type imports
 const login = loginRegisterValidation;
 const register= Joi.object({
  name: requiredStringValidation("Name"),
  password: requiredStringValidation("password"),
  email: requiredStringValidation("email"),
});



export {login,register};
