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
exports.CartController = void 0;
const i18n_1 = __importDefault(require("i18n"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_parser_1 = require("@util/response-parser");
const constant_1 = __importDefault(require("@config/constant"));
const cart_service_1 = require("@service/cart.service");
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
const secret_1 = require("@config/secret");
class CartController {
    constructor() {
        this.addItem = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body: { productId, quantity } } = req;
            const token = req.header("Authorization");
            const decodedToken = jsonwebtoken_1.default.verify(token, secret_1.JWT_SECRET);
            const response = yield this.cartService.addItem(productId, quantity, decodedToken.email);
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("item_added"))
                .send(res);
        });
        this.updateCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { params: { itemId } } = req;
            const response = yield this.cartService.updateCart(req.body.quantity, itemId);
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("cart_updated"))
                .send(res);
        });
        this.deleteCartItem = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { params: { itemId } } = req;
            const response = yield this.cartService.deleteCartItem(itemId);
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("item_deleted"))
                .send(res);
        });
        this.getCartItems = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.cartService.getCartItem();
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("AllCartItems"))
                .send(res);
        });
        this.responseParser = new response_parser_1.ResponseParser();
        this.cartService = new cart_service_1.CartService();
    }
}
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], CartController.prototype, "addItem", void 0);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], CartController.prototype, "updateCart", void 0);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], CartController.prototype, "deleteCartItem", void 0);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], CartController.prototype, "getCartItems", void 0);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map