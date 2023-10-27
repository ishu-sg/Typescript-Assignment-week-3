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
exports.ProductService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const i18n_1 = __importDefault(require("i18n"));
const typeorm_1 = require("typeorm");
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
const db_connection_1 = require("../database/db-connection");
const product_model_1 = require("../database/model/product.model");
const product_repository_1 = require("@database/repository/product.repository");
class ProductService {
    getProduct(min, max) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const productRepository = queryRunner.manager.getRepository(product_model_1.Product);
            if (!min || !max) {
                try {
                    yield queryRunner.startTransaction();
                    const productdata = yield product_repository_1.CartRepo.left();
                    console.log(productdata);
                    yield queryRunner.commitTransaction();
                    return productdata;
                }
                catch (error) {
                    yield queryRunner.rollbackTransaction();
                    throw new http_errors_1.default.BadRequest(i18n_1.default.__("badinput"));
                }
                finally {
                    yield queryRunner.release();
                }
            }
            else {
                try {
                    yield queryRunner.startTransaction();
                    const productdata = productRepository.findBy({ price: (0, typeorm_1.Between)(min - 1, max + 1) });
                    yield queryRunner.commitTransaction();
                    return productdata;
                }
                catch (error) {
                    yield queryRunner.rollbackTransaction();
                    throw new http_errors_1.default.BadRequest(i18n_1.default.__("badinput"));
                }
                finally {
                    yield queryRunner.release();
                }
            }
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const productRepository = queryRunner.manager.getRepository(product_model_1.Product);
            try {
                const productdata = productRepository.delete({ id: productId });
            }
            catch (error) {
                throw new http_errors_1.default.BadRequest(i18n_1.default.__("badinput"));
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    searchProduct(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const productRepository = queryRunner.manager.getRepository(product_model_1.Product);
            try {
                yield queryRunner.startTransaction();
                const productdata = productRepository.find({ where: { name: (0, typeorm_1.Like)(`%${name}%`) } });
                yield queryRunner.commitTransaction();
                return productdata;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new http_errors_1.default.BadRequest(i18n_1.default.__("badinput"));
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    updatePrice(price, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const productRepository = queryRunner.manager.getRepository(product_model_1.Product);
            try {
                yield queryRunner.startTransaction();
                yield productRepository.update({ id: productId }, { price: price });
                const productdata = productRepository.findOne({ where: { id: productId } });
                yield queryRunner.commitTransaction();
                return productdata;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new http_errors_1.default.BadRequest(i18n_1.default.__("badinput"));
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    addProduct(name, price, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const productRepository = queryRunner.manager.getRepository(product_model_1.Product);
            try {
                yield queryRunner.startTransaction();
                const productdata = yield productRepository.save({
                    name: name,
                    price: price,
                    description: description
                });
                yield queryRunner.commitTransaction();
                return productdata;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new http_errors_1.default.BadRequest(i18n_1.default.__("badinput"));
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
}
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "getProduct", null);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "deleteProduct", null);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "searchProduct", null);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "updatePrice", null);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "addProduct", null);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map