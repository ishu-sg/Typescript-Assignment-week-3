import Joi from "@hapi/joi";
import {loginRegisterValidation,requiredStringValidation } from "./common";
//item joi type imports
 const login = loginRegisterValidation;
 const addProduct= Joi.object({
  name: requiredStringValidation("name"),
  price: Joi.number().required(),
  description: requiredStringValidation("description"),
});
const updatePrice= Joi.object({
    price: Joi.number().required(),
  });
  
  const deleteProduct= Joi.object({
    productId: requiredStringValidation("productId"),
  });
export {login,addProduct,updatePrice,deleteProduct};
