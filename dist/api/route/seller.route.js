"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_request_validator_1 = require("@middleware/http-request-validator");
const seller_controller_1 = require("@api/controller/seller.controller");
const authenticate_request_1 = require("@middleware/authenticate-request");
const seller_validator_1 = require("@api/validator/seller.validator");
const fileupload_1 = require("../../middleware/fileupload");
class SellerRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.sellerController = new seller_controller_1.SellerController();
        this.httpRequestValidator = new http_request_validator_1.HttpRequestValidator();
        const authMiddleware = new authenticate_request_1.AuthenticateRequest();
        this.authenticate = authMiddleware.validateSeller;
        this.assign();
    }
    assign() {
        this.router.post("/register", this.httpRequestValidator.validate("body", seller_validator_1.register), this.sellerController.register);
        this.router.post("/login", this.httpRequestValidator.validate("body", seller_validator_1.login), this.sellerController.login);
        this.router.post("/download", fileupload_1.storage, this.sellerController.download);
    }
}
exports.default = new SellerRoute().router;
//# sourceMappingURL=seller.route.js.map