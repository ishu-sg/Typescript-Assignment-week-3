"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("@api/controller/user.controller");
const authenticate_request_1 = require("@middleware/authenticate-request");
const http_request_validator_1 = require("@middleware/http-request-validator");
const user_validator_1 = require("@api/validator/user.validator");
const fileupload_1 = require("../../middleware/fileupload");
class UserRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.userController = new user_controller_1.UserController();
        const authMiddleware = new authenticate_request_1.AuthenticateRequest();
        this.authenticate = authMiddleware.validate;
        this.httpRequestValidator = new http_request_validator_1.HttpRequestValidator();
        this.assign();
    }
    assign() {
        this.router.post("/register", this.httpRequestValidator.validate("body", user_validator_1.register), this.userController.register);
        this.router.post("/login", this.httpRequestValidator.validate("body", user_validator_1.login), this.authenticate, this.userController.login);
        this.router.post("/download", fileupload_1.storage, this.userController.download);
    }
}
exports.default = new UserRoute().router;
//# sourceMappingURL=user.route.js.map