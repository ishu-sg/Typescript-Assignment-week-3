"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const common_1 = require("./common");
const login = common_1.loginRegisterValidation;
exports.login = login;
const register = common_1.loginRegisterValidation.append({
    firstName: (0, common_1.requiredStringValidation)("firstName"),
    lastName: (0, common_1.requiredStringValidation)("lastName"),
    dob: (0, common_1.requiredStringValidation)("dob"),
    marketing: joi_1.default.optional(),
});
exports.register = register;
//# sourceMappingURL=base.validator.js.map