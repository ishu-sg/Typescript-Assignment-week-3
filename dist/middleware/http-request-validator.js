"use strict";
// Copyright (C) 2019 by StudioGraphene. All rights reserved.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestValidator = void 0;
const response_parser_1 = require("@util/response-parser");
class HttpRequestValidator {
    constructor() {
        this.requestType = (type) => type;
        this.responseParser = new response_parser_1.ResponseParser();
    }
    /**
     * Private method to validate data againt Joi schema
     *
     * @param data
     * @param schema
     */
    validate(type, schema) {
        return (req, res, next) => {
            const reqType = this.requestType(type);
            const data = req[reqType];
            const { error } = schema.validate(data);
            if (error === undefined) {
                next();
                return;
            }
            this.handleValidationError(error);
            this.responseParser.send(res);
        };
    }
    handleValidationError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            const err = [];
            error.details.forEach((element) => {
                err.push({
                    message: element.message,
                    label: element.context.key,
                });
            });
            this.responseParser
                .setHttpCode(400)
                .setStatus(false)
                .setResponseCode("validation_error")
                .setMessage("Validation Error")
                .setBody(err);
        });
    }
}
exports.HttpRequestValidator = HttpRequestValidator;
//# sourceMappingURL=http-request-validator.js.map