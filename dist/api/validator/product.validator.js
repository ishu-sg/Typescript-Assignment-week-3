"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updatePrice = exports.addProduct = exports.login = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const common_1 = require("./common");
//item joi type imports
const login = common_1.loginRegisterValidation;
exports.login = login;
const addProduct = joi_1.default.object({
    name: (0, common_1.requiredStringValidation)("name"),
    price: joi_1.default.number().required(),
    description: (0, common_1.requiredStringValidation)("description"),
});
exports.addProduct = addProduct;
const updatePrice = joi_1.default.object({
    price: joi_1.default.number().required(),
});
exports.updatePrice = updatePrice;
const deleteProduct = joi_1.default.object({
    productId: (0, common_1.requiredStringValidation)("productId"),
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.validator.js.map