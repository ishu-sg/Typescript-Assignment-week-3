"use strict";
// Copyright (C) 2019 by StudioGraphene. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateRequest = void 0;
const i18n_1 = __importDefault(require("i18n"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const response_parser_1 = require("@util/response-parser");
const constant_1 = __importDefault(require("@config/constant"));
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
const secret_1 = require("@config/secret");
class AuthenticateRequest {
    /**
     * Global middleware to check request is autneticated of not
     * @param req
     * @param res
     * @param next
     */
    validate(req, res, next) {
        const token = req.header("Authorization");
        if (!token) {
            const responseParser = new response_parser_1.ResponseParser();
            responseParser
                .setHttpCode(constant_1.default.HTTP_STATUS_UNAUTHORIZED)
                .setStatus(false)
                .setResponseCode("unauthorized")
                .setMessage(i18n_1.default.__("unauthorized"))
                .setBody({})
                .send(res);
            return;
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, secret_1.JWT_SECRET);
        //session timeout feature added
        nodejs_telemetry_1.logger.debug("decoded-token", "AuthenticateRequest.validate", {
            decodedToken,
        });
        if (!decodedToken) {
            throw new http_errors_1.default.Unauthorized(i18n_1.default.__("invalidToken"));
        }
        console.log(decodedToken);
        if (decodedToken.role !== "user") {
            throw new http_errors_1.default.Unauthorized(i18n_1.default.__("invalidrole"));
        }
        if (decodedToken.email !== req.body.email) {
            throw new http_errors_1.default.Unauthorized(i18n_1.default.__("invalid token"));
        }
        req.user = JSON.parse(JSON.stringify(decodedToken));
        // passing usr context to logger
        nodejs_telemetry_1.logger.userContext({ id: req.user.id });
        next();
    }
    validateSeller(req, res, next) {
        const token = req.header("Authorization");
        if (!token) {
            const responseParser = new response_parser_1.ResponseParser();
            responseParser
                .setHttpCode(constant_1.default.HTTP_STATUS_UNAUTHORIZED)
                .setStatus(false)
                .setResponseCode("unauthorized")
                .setMessage(i18n_1.default.__("unauthorized"))
                .setBody({})
                .send(res);
            return;
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, secret_1.JWT_SECRET);
        nodejs_telemetry_1.logger.debug("decoded-token", "AuthenticateRequest.validate", {
            decodedToken,
        });
        if (!decodedToken) {
            throw new http_errors_1.default.Unauthorized(i18n_1.default.__("invalidToken"));
        }
        if (decodedToken.role !== "seller") {
            throw new http_errors_1.default.Unauthorized(i18n_1.default.__("invalidrole"));
        }
        if (decodedToken.email !== req.body.email) {
            throw new http_errors_1.default.Unauthorized(i18n_1.default.__("invalid token"));
        }
        req.user = JSON.parse(JSON.stringify(decodedToken));
        next();
    }
}
exports.AuthenticateRequest = AuthenticateRequest;
//# sourceMappingURL=authenticate-request.js.map