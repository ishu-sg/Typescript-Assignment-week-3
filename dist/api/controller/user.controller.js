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
exports.UserController = void 0;
const i18n_1 = __importDefault(require("i18n"));
const response_parser_1 = require("@util/response-parser");
const constant_1 = __importDefault(require("@config/constant"));
const user_service_1 = require("@service/user.service");
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
class UserController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body: { name, email, password }, } = req;
            console.log(req.body);
            const response = yield this.userService.register(name, email, password);
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("user registered"))
                .send(res);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body: { email, password } } = req;
            const response = yield this.userService.login(email, password);
            this.responseParser
                .setStatus(true)
                .setHttpCode(constant_1.default.HTTP_STATUS_CREATED)
                .setBody(response)
                .setMessage(i18n_1.default.__("user registered"))
                .send(res);
        });
        this.download = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send("file uploaded");
        });
        this.responseParser = new response_parser_1.ResponseParser();
        this.userService = new user_service_1.UserService();
    }
}
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], UserController.prototype, "register", void 0);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], UserController.prototype, "login", void 0);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Object)
], UserController.prototype, "download", void 0);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map