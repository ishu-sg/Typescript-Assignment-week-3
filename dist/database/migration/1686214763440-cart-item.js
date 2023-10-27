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
exports.CartItem1686214763440 = void 0;
const typeorm_1 = require("typeorm");
class CartItem1686214763440 {
    constructor() {
        this.tableName = "cart_item";
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: this.tableName,
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: false,
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isNullable: false,
                        isUnique: false,
                    },
                    {
                        name: "quantity",
                        type: "varchar",
                        isNullable: false,
                        isUnique: false,
                    }
                ],
                foreignKeys: [
                    new typeorm_1.TableForeignKey({
                        name: "productid_cartitem_product",
                        referencedTableName: "product",
                        columnNames: ["product_id"],
                        referencedColumnNames: ["id"],
                    }),
                    new typeorm_1.TableForeignKey({
                        name: "user_id_cartitem_user",
                        referencedTableName: "user",
                        columnNames: ["user_id"],
                        referencedColumnNames: ["id"],
                    })
                ]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable(this.tableName);
        });
    }
}
exports.CartItem1686214763440 = CartItem1686214763440;
//# sourceMappingURL=1686214763440-cart-item.js.map