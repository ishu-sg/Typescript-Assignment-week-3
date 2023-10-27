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
exports.Order1686214773192 = void 0;
const typeorm_1 = require("typeorm");
class Order1686214773192 {
    constructor() {
        this.tableName = "order";
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
                        name: "created_at",
                        type: "timestamptz",
                        isNullable: false,
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamptz",
                        isNullable: false,
                        default: "now()",
                    }
                ],
                foreignKeys: [
                    new typeorm_1.TableForeignKey({
                        name: "user_id_order_user",
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
exports.Order1686214773192 = Order1686214773192;
//# sourceMappingURL=1686214773192-order.js.map