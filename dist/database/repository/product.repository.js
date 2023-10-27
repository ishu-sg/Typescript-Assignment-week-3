"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepo = void 0;
const cart_item_model_1 = require("@database/model/cart-item.model");
const db_connection_1 = require("@database/db-connection");
exports.CartRepo = db_connection_1.dbConnection.getRepository(cart_item_model_1.CartItem).extend({
    left() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('CartItem')
                .leftJoinAndSelect('CartItem.product', "product")
                .select(["CartItem.productId", "product.name"])
                .getMany();
        });
    },
});
// await listingRepo
//     .createQueryBuilder('listing')
//     .leftJoinAndSelect('listing.site', 'site')
//     .select(['listing.listing_id', 'site.marketplace_id'])
//     .getMany();
//# sourceMappingURL=product.repository.js.map