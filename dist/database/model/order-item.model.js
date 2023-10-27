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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const typeorm_1 = require("typeorm");
const cart_item_model_1 = require("./cart-item.model");
const order_model_1 = require("./order.model");
let OrderItem = class OrderItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false }),
    __metadata("design:type", String)
], OrderItem.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false }),
    __metadata("design:type", String)
], OrderItem.prototype, "cartItemId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_model_1.Order),
    (0, typeorm_1.JoinColumn)({ name: "order_id" }),
    __metadata("design:type", order_model_1.Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cart_item_model_1.CartItem),
    (0, typeorm_1.JoinColumn)({ name: "cart_item_id" }),
    __metadata("design:type", cart_item_model_1.CartItem)
], OrderItem.prototype, "cartitem", void 0);
OrderItem = __decorate([
    (0, typeorm_1.Entity)("order_item")
], OrderItem);
exports.OrderItem = OrderItem;
//# sourceMappingURL=order-item.model.js.map