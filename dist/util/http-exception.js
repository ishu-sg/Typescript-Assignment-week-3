"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message, code) {
        super(message);
        this.status = status;
        this.message = message;
        this.code = code;
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=http-exception.js.map