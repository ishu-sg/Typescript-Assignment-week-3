"use strict";
// Copyright (C) 2019 by StudioGraphene. All rights reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseParser = void 0;
class ResponseParser {
    /**
     * Method to set and send response back ishu
     *
     * @param res
     */
    static parseAndSend(httpCode, status, message, code, data, res) {
        res.status(httpCode).json({
            status,
            message,
            code,
            data,
        });
    }
    constructor() {
        this.resHttpCode = 200;
        this.resStatus = true;
        this.resMessage = "";
        this.resCode = "SUC10000";
        this.resBody = {};
    }
    /**
     * Setter for httpCode for response
     *
     * @param httpCode
     */
    setHttpCode(httpCode) {
        this.resHttpCode = httpCode;
        return this;
    }
    /**
     * Setter for status for response
     *
     * @param status
     */
    setStatus(status) {
        this.resStatus = status;
        return this;
    }
    /**
     * Setter for message of response
     *
     * @param message
     */
    setMessage(message) {
        this.resMessage = message;
        return this;
    }
    /**
     * Setter for code of response
     *
     * @param message
     */
    setResponseCode(code) {
        this.resCode = code;
        return this;
    }
    /**
     * Setter for body of response
     *
     * @param body
     */
    setBody(body) {
        this.resBody = body;
        return this;
    }
    /**
     * Method to send response back
     *
     * @param res
     */
    send(res) {
        res.status(this.resHttpCode).json({
            status: this.resStatus,
            message: this.resMessage,
            code: this.resCode,
            data: this.resBody,
        });
    }
}
exports.ResponseParser = ResponseParser;
//# sourceMappingURL=response-parser.js.map