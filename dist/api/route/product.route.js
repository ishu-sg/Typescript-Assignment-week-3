"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_request_validator_1 = require("@middleware/http-request-validator");
const authenticate_request_1 = require("@middleware/authenticate-request");
const product_controller_1 = require("@api/controller/product.controller");
const product_validator_1 = require("@api/validator/product.validator");
class ProductRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.productController = new product_controller_1.ProductController();
        this.httpRequestValidator = new http_request_validator_1.HttpRequestValidator();
        const authMiddleware = new authenticate_request_1.AuthenticateRequest();
        this.authenticate = authMiddleware.validate;
        this.authenticateSeller = authMiddleware.validateSeller;
        this.assign();
    }
    assign() {
        this.router.post("/", this.authenticateSeller, this.httpRequestValidator.validate("body", product_validator_1.addProduct), this.productController.addProduct);
        this.router.get("/", 
        // this.authenticate,
        this.productController.getProduct);
        this.router.get("/:name", this.authenticate, this.productController.searchProduct);
        this.router.put("/:productId", this.authenticateSeller, this.httpRequestValidator.validate("body", product_validator_1.updatePrice), this.productController.updatePrice);
        this.router.delete("/:productId", this.authenticateSeller, this.httpRequestValidator.validate("params", product_validator_1.deleteProduct), this.productController.deleteProduct);
    }
}
// /list
// {
//   product:[{}],
//   filters:[{
//     color:['red','black'],
//     type:[]
//   }]
// }
// /list 
// {body:{filters:{
//   color:'red'
// }}}
exports.default = new ProductRoute().router;
//# sourceMappingURL=product.route.js.map