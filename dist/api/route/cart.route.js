"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_request_validator_1 = require("@middleware/http-request-validator");
const cart_validator_1 = require("@api/validator/cart.validator");
const cart_controller_1 = require("@api/controller/cart.controller");
const authenticate_request_1 = require("@middleware/authenticate-request");
class CartRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.cartController = new cart_controller_1.CartController();
        this.httpRequestValidator = new http_request_validator_1.HttpRequestValidator();
        const authMiddleware = new authenticate_request_1.AuthenticateRequest();
        this.authenticate = authMiddleware.validate;
        this.assign();
    }
    assign() {
        this.router.post("/items", this.authenticate, this.httpRequestValidator.validate("body", cart_validator_1.addItem), this.cartController.addItem);
        this.router.put("/items/:itemId", this.authenticate, this.httpRequestValidator.validate("body", cart_validator_1.updateCart), this.cartController.updateCart);
        this.router.delete("/items/:itemId", this.authenticate, this.cartController.deleteCartItem);
        this.router.get("/", this.cartController.getCartItems);
    }
}
exports.default = new CartRoute().router;
//# sourceMappingURL=cart.route.js.map