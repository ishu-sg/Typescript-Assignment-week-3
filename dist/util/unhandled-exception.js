"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unhandledExceptionHandler = void 0;
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
const handleRejectedPromise = (reason, promise) => {
    nodejs_telemetry_1.logger.error("Unexpected promise rejection occured.", "handleRejectedPromise", {
        data: {
            reason,
            ex: promise,
        },
    });
    process.exit(1);
};
const unhandledExceptionHandler = () => {
    process.on("unhandledRejection", handleRejectedPromise);
};
exports.unhandledExceptionHandler = unhandledExceptionHandler;
//# sourceMappingURL=unhandled-exception.js.map