"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("module-alias/register");
const route_1 = require("@api/route");
const unhandled_exception_1 = require("@util/unhandled-exception");
// import { adotInit } from "./core/kernel";
const secret_1 = require("@config/secret");
const kernel_1 = require("./core/kernel");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.kernel = new kernel_1.Kernel();
        this.router = new route_1.Routes();
        this.appName = `${secret_1.APP_NAME}@${secret_1.APP_VERSION}`;
        this.initMiddlewares();
    }
    initMiddlewares() {
        return __awaiter(this, void 0, void 0, function* () {
            this.kernel.initSentry(this.app);
            this.kernel.initBodyParser(this.app);
            this.kernel.addCommonMiddleware(this.app);
            this.kernel.attachRequestContext(this.app);
            yield this.kernel.databaseConnection();
            this.kernel.initTranslation(this.app);
            this.kernel.setupSwagger(this.app);
            this.router.routes(this.app);
            this.kernel.sentryErrorHandler(this.app);
            this.kernel.errorMiddleware(this.app);
            (0, unhandled_exception_1.unhandledExceptionHandler)();
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map