"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalRegNumberValidation = exports.requiredRegNumberValidation = exports.requiredStringValidation = exports.optionalStringValidation = exports.loginRegisterValidation = exports.idValidation = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const loginRegisterValidation = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.email": "Email is invalid",
        "any.required": "Email is required",
    }),
    password: joi_1.default.string().required().min(8).messages({
        "string.base": "password must be a string",
        "any.required": "password is required",
        "string.min": "password must be 8 characters long",
    }),
});
exports.loginRegisterValidation = loginRegisterValidation;
const idValidation = (key) => joi_1.default.string()
    .guid({ version: "uuidv4" })
    .required()
    .messages({
    "string.base": `${key} must be a string`,
    "any.required": `${key} is required`,
    "string.guid": `invalid ${key} format`,
});
exports.idValidation = idValidation;
const requiredStringValidation = (key) => joi_1.default.string()
    .required()
    .messages({
    "string.base": `${key} must be a string`,
    "any.required": `${key} is required`,
});
exports.requiredStringValidation = requiredStringValidation;
const optionalStringValidation = (key) => joi_1.default.string()
    .optional()
    .messages({
    "string.base": `${key} must be a string`,
});
exports.optionalStringValidation = optionalStringValidation;
const requiredRegNumberValidation = () => joi_1.default.string()
    .required()
    .regex(/^([0-9A-Z]){2,7}$/)
    .messages({
    "string.base": `Car registration number is not in valid format.`,
});
exports.requiredRegNumberValidation = requiredRegNumberValidation;
const optionalRegNumberValidation = () => joi_1.default.string()
    .optional()
    .regex(/^([0-9A-Z]){2,7}$/)
    .messages({
    "string.base": `Car registration number is not in valid format.`,
});
exports.optionalRegNumberValidation = optionalRegNumberValidation;
//# sourceMappingURL=common.js.map