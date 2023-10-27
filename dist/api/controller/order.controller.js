"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.OrderController = void 0;
const i18n_1 = __importDefault(require("i18n"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_parser_1 = require("@util/response-parser");
const constant_1 = __importDefault(require("@config/constant"));
const order_service_1 = require("@service/order.service");
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
const secret_1 = require("@config/secret");
class OrderController {
    constructor() {
        this.order = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.header("Authorization");
            const decodedToken = jsonwebtoken_1.default.verify(token, secret_1.JWT_SECRET);
            const response = yield this.orderService.order(decodedToken.email);
            // sendResponse();
            // function sendResponse() {
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("order_placed"))
                .send(res);
            // }
        });
        //remove any from the project
        this.cancelOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.header("Authorization");
            const decodedToken = jsonwebtoken_1.default.verify(token, secret_1.JWT_SECRET);
            const response = yield this.orderService.cancelOrder(decodedToken.email);
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("order_cancelled"))
                .send(res);
        });
        this.responseParser = new response_parser_1.ResponseParser();
        this.orderService = new order_service_1.OrderService();
    }
}
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], OrderController.prototype, "order", void 0);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], OrderController.prototype, "cancelOrder", void 0);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map