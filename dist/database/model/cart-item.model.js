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
exports.CartItem = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("./user.model");
const product_model_1 = require("./product.model");
let CartItem = class CartItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], CartItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false }),
    __metadata("design:type", String)
], CartItem.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false }),
    __metadata("design:type", String)
], CartItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false }),
    __metadata("design:type", String)
], CartItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_model_1.User)
], CartItem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_model_1.Product),
    (0, typeorm_1.JoinColumn)({ name: "product_id" }),
    __metadata("design:type", product_model_1.Product)
], CartItem.prototype, "product", void 0);
CartItem = __decorate([
    (0, typeorm_1.Entity)("cart_item")
], CartItem);
exports.CartItem = CartItem;
//# sourceMappingURL=cart-item.model.js.map