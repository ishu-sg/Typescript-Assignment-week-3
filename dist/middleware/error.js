"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_parser_1 = require("@util/response-parser");
const i18n_1 = __importDefault(require("i18n"));
function errorMiddleware(error, request, response, next) {
    const httpCode = error.status || 500;
    const message = error.message || i18n_1.default.__("ERR10001");
    const code = error.code || "ERR10001";
    const responseParser = new response_parser_1.ResponseParser();
    responseParser
        .setHttpCode(httpCode)
        .setStatus(false)
        .setMessage(message)
        .setResponseCode(code)
        .send(response);
}
exports.default = errorMiddleware;
//# sourceMappingURL=error.js.map