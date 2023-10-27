"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_errors_1 = __importDefault(require("http-errors"));
const i18n_1 = __importDefault(require("i18n"));
const jwt = __importStar(require("jsonwebtoken"));
const secret_1 = require("@config/secret");
const constant_1 = __importDefault(require("@config/constant"));
const user_model_1 = require("@database/model/user.model");
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
const db_connection_1 = require("../database/db-connection");
class UserService {
    register(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const userRepository = queryRunner.manager.getRepository(user_model_1.User);
            try {
                yield queryRunner.startTransaction();
                const userExists = yield userRepository.findOne({
                    where: {
                        email: email.toLowerCase(),
                    },
                });
                if (userExists) {
                    throw new http_errors_1.default.BadRequest(i18n_1.default.__("user_already_exists"));
                }
                const hashedPassword = yield this.getEncryptedPassword(password);
                const user = yield userRepository.save({
                    name: name,
                    password: hashedPassword,
                    email: email
                });
                yield queryRunner.commitTransaction();
                return user;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const userRepository = queryRunner.manager.getRepository(user_model_1.User);
            const user = yield userRepository.findOne({
                where: {
                    email: email.toLowerCase()
                },
            });
            if (!user) {
                throw new http_errors_1.default.NotFound(i18n_1.default.__("user_not_found"));
            }
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassword) {
                throw new http_errors_1.default.BadRequest(i18n_1.default.__("incorrect_password"));
            }
            nodejs_telemetry_1.logger.info("user", "UserService.login", { user });
            const token = jwt.sign({ id: user.id, email: user.email, role: "user" }, secret_1.JWT_SECRET);
            return {
                token
            };
        });
    }
    getEncryptedPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(constant_1.default.SALT_ROUNDS);
            return bcrypt_1.default.hash(password, salt);
        });
    }
}
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "register", null);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "login", null);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getEncryptedPassword", null);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map