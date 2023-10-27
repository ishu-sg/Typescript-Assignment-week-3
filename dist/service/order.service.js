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
exports.OrderService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const i18n_1 = __importDefault(require("i18n"));
const user_model_1 = require("@database/model/user.model");
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
const db_connection_1 = require("../database/db-connection");
const cart_item_model_1 = require("../database/model/cart-item.model");
const order_model_1 = require("@database/model/order.model");
const order_item_model_1 = require("@database/model/order-item.model");
class OrderService {
    order(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const userRepository = queryRunner.manager.getRepository(user_model_1.User);
            const orderRepository = queryRunner.manager.getRepository(order_model_1.Order);
            const orderItemRepository = queryRunner.manager.getRepository(order_item_model_1.OrderItem);
            const cartitemRepository = queryRunner.manager.getRepository(cart_item_model_1.CartItem);
            try {
                yield queryRunner.startTransaction();
                const user = yield userRepository.findOne({
                    where: {
                        email: email.toLowerCase()
                    },
                });
                if (!user) {
                    throw new http_errors_1.default.NotFound(i18n_1.default.__("user_not_found"));
                }
                const orderdata = yield orderRepository.save({
                    userId: user.id
                });
                const cartitemdata = yield cartitemRepository.find({ where: { userId: user.id } });
                const x = [];
                for (const val of cartitemdata) {
                    const temp = {
                        orderId: orderdata.id,
                        cartItemId: val.id
                    };
                    x.push(temp);
                }
                const orderitemdata = yield orderItemRepository.save(x);
                yield queryRunner.commitTransaction();
                return { orderId: orderdata.id, userId: orderdata.userId, cartItems: cartitemdata };
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    cancelOrder(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_connection_1.dbConnection.createQueryRunner();
            yield queryRunner.connect();
            const userRepository = queryRunner.manager.getRepository(user_model_1.User);
            const orderRepository = queryRunner.manager.getRepository(order_model_1.Order);
            const orderItemRepository = queryRunner.manager.getRepository(order_item_model_1.OrderItem);
            const cartitemRepository = queryRunner.manager.getRepository(cart_item_model_1.CartItem);
            try {
                yield queryRunner.startTransaction();
                const user = yield userRepository.findOne({
                    where: {
                        email: email.toLowerCase()
                    },
                });
                if (!user) {
                    throw new http_errors_1.default.NotFound(i18n_1.default.__("user_not_found"));
                }
                const orderdata = yield orderRepository.findOne({ where: {
                        userId: user.id
                    } });
                yield orderItemRepository.delete({ orderId: orderdata.id });
                yield orderRepository.delete({ userId: user.id });
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
}
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "order", null);
__decorate([
    nodejs_telemetry_1.traceDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "cancelOrder", null);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map