"use strict";
// Copyright (C) 2019 by StudioGraphene. All rights reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestIDMiddleware = void 0;
const uuid_1 = require("uuid");
class RequestIDMiddleware {
    /**
     * Global middleware to assign header "x-request-id" to response
     * @param req
     * @param res
     * @param next
     */
    assign(req, res, next) {
        const requestID = (0, uuid_1.v1)();
        res.set("x-request-id", requestID);
        next();
    }
}
exports.RequestIDMiddleware = RequestIDMiddleware;
//# sourceMappingURL=request-id.js.map