"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCart = exports.addItem = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const common_1 = require("./common");
const addItem = joi_1.default.object({
    email: (0, common_1.requiredStringValidation)("email"),
    productId: (0, common_1.requiredStringValidation)("Name"),
    quantity: (0, common_1.requiredStringValidation)("quantity"),
});
exports.addItem = addItem;
const updateCart = joi_1.default.object({
    email: (0, common_1.requiredStringValidation)("email"),
    quantity: (0, common_1.requiredStringValidation)("quantity"),
});
exports.updateCart = updateCart;
//# sourceMappingURL=cart.validator.js.map