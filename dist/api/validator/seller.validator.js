"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const common_1 = require("./common");
//item joi type imports
const login = common_1.loginRegisterValidation;
exports.login = login;
const register = joi_1.default.object({
    name: (0, common_1.requiredStringValidation)("Name"),
    password: (0, common_1.requiredStringValidation)("password"),
    email: (0, common_1.requiredStringValidation)("email"),
});
exports.register = register;
//# sourceMappingURL=seller.validator.js.map