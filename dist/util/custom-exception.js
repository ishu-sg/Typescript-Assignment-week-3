"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
const i18n_1 = __importDefault(require("i18n"));
const http_exception_1 = require("@util/http-exception");
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
const constant_1 = __importDefault(require("@config/constant"));
class CustomException {
    static general(error) {
        nodejs_telemetry_1.logger.error(error, "CustomException.general");
        return new http_exception_1.HttpException(constant_1.default.HTTP_STATUS_INTERNAL_ERROR, i18n_1.default.__("ERR10001"), "ERR10001");
    }
}
exports.CustomException = CustomException;
//# sourceMappingURL=custom-exception.js.map