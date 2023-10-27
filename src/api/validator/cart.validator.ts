import Joi from "@hapi/joi";
import {loginRegisterValidation,requiredStringValidation } from "./common";

const addItem= Joi.object({
    email: requiredStringValidation("email"),
    productId: requiredStringValidation("Name"),
    quantity: requiredStringValidation("quantity"),
  });
  const updateCart= Joi.object({
    email: requiredStringValidation("email"),
    quantity: requiredStringValidation("quantity"),
  });
  
  export {addItem,updateCart}