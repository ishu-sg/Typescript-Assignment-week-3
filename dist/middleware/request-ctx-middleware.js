"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCtx = void 0;
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
// import { v1 as uuid } from "uuid";
/**
 * Global middleware to assign "requestId" to async storage
 * @param req
 * @param res
 * @param next
 */
function requestCtx(req, res, next) {
    const reqCtxObj = {
        url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
        method: req.method,
        request_id: res.get("x-request-id"),
    };
    nodejs_telemetry_1.logger.contextData(reqCtxObj);
    next();
}
exports.requestCtx = requestCtx;
//# sourceMappingURL=request-ctx-middleware.js.map