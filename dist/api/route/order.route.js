"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("@api/controller/order.controller");
const http_request_validator_1 = require("@middleware/http-request-validator");
const authenticate_request_1 = require("@middleware/authenticate-request");
class OrderRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.orderController = new order_controller_1.OrderController();
        this.httpRequestValidator = new http_request_validator_1.HttpRequestValidator();
        const authMiddleware = new authenticate_request_1.AuthenticateRequest();
        this.authenticate = authMiddleware.validate;
        this.assign();
    }
    assign() {
        this.router.post("/", this.authenticate, this.orderController.order);
        this.router.delete("/", this.authenticate, this.orderController.cancelOrder);
    }
}
exports.default = new OrderRoute().router;
//# sourceMappingURL=order.route.js.map