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
exports.OrderItem1686214793549 = void 0;
const typeorm_1 = require("typeorm");
class OrderItem1686214793549 {
    constructor() {
        this.tableName = "order_item";
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
                        name: "order_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "cart_item_id",
                        type: "uuid",
                        isNullable: false,
                    }
                ],
                foreignKeys: [
                    new typeorm_1.TableForeignKey({
                        name: "order_id_orderitem_order",
                        referencedTableName: "order",
                        columnNames: ["order_id"],
                        referencedColumnNames: ["id"],
                    }),
                    new typeorm_1.TableForeignKey({
                        name: "cart_item_id_orderitem_cartitem",
                        referencedTableName: "cart_item",
                        columnNames: ["cart_item_id"],
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
exports.OrderItem1686214793549 = OrderItem1686214793549;
//# sourceMappingURL=1686214793549-order-item.js.map