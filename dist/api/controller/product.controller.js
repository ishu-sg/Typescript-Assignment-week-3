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
exports.ProductController = void 0;
const i18n_1 = __importDefault(require("i18n"));
const response_parser_1 = require("@util/response-parser");
const constant_1 = __importDefault(require("@config/constant"));
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
const product_service_1 = require("@service/product.service");
class ProductController {
    constructor() {
        this.addProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body: { name, price, description } } = req;
            const response = yield this.productService.addProduct(name, price, description);
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("products_added"))
                .send(res);
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { params: { productId } } = req;
            const response = yield this.productService.deleteProduct(productId);
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("products_deleted"))
                .send(res);
        });
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { query: { min, max } } = req;
            const response = yield this.productService.getProduct(+min, +max);
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("products_retrieved"))
                .send(res);
        });
        this.searchProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { params: { name } } = req;
            const response = yield this.productService.searchProduct(name);
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("products_retieved"))
                .send(res);
        });
        this.updatePrice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body: { price }, params: { productId } } = req;
            const response = yield this.productService.updatePrice(price, productId);
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("products_retieved"))
                .send(res);
        });
        this.responseParser = new response_parser_1.ResponseParser();
        this.productService = new product_service_1.ProductService();
    }
}
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], ProductController.prototype, "addProduct", void 0);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], ProductController.prototype, "deleteProduct", void 0);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], ProductController.prototype, "getProduct", void 0);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], ProductController.prototype, "searchProduct", void 0);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], ProductController.prototype, "updatePrice", void 0);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map