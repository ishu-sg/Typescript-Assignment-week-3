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
exports.CartService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const i18n_1 = __importDefault(require("i18n"));
const user_model_1 = require("@database/model/user.model");
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
const db_connection_1 = require("../database/db-connection");
const cart_item_model_1 = require("../database/model/cart-item.model");
class CartService {
    updateCart(quantity, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const cartitemRepository = queryRunner.manager.getRepository(cart_item_model_1.CartItem);
            try {
                yield queryRunner.startTransaction();
                yield cartitemRepository.update({ productId: itemId }, { quantity: quantity });
                const cartitemdata = yield cartitemRepository.findOne({ where: {
                        productId: itemId
                    } });
                yield queryRunner.commitTransaction();
                return cartitemdata;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    deleteCartItem(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const cartitemRepository = queryRunner.manager.getRepository(cart_item_model_1.CartItem);
            try {
                yield queryRunner.startTransaction();
                const cartitemdata = yield cartitemRepository.delete({ productId: itemId });
                yield queryRunner.commitTransaction();
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    getCartItem() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const cartitemRepository = queryRunner.manager.getRepository(cart_item_model_1.CartItem);
            try {
                // await queryRunner.startTransaction();
                const cartitemdata = yield cartitemRepository.find();
                // await queryRunner.commitTransaction();
                return cartitemdata;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    addItem(productId, quantity, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const cartItemRepository = queryRunner.manager.getRepository(cart_item_model_1.CartItem);
            const userRepository = queryRunner.manager.getRepository(user_model_1.User);
            try {
                yield queryRunner.startTransaction();
                const userdata = yield userRepository.findOne({ where: {
                        email: email
                    } });
                const cartitemdata = yield cartItemRepository.save({
                    userId: userdata.id,
                    productId: productId,
                    quantity: quantity
                });
                yield queryRunner.commitTransaction();
                return cartitemdata;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new http_errors_1.default.BadRequest(i18n_1.default.__("badinputforaddingitemtocart"));
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
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CartService.prototype, "updateCart", null);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartService.prototype, "deleteCartItem", null);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartService.prototype, "getCartItem", null);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CartService.prototype, "addItem", null);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map