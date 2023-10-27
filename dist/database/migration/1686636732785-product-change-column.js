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
exports.ProductChangeColumn1686636732785 = void 0;
const typeorm_1 = require("typeorm");
class ProductChangeColumn1686636732785 {
    constructor() {
        this.tableName = "product";
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn(this.tableName, 'price');
            yield queryRunner.addColumn(this.tableName, new typeorm_1.TableColumn({
                name: "price",
                type: "numeric"
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn(this.tableName, 'price');
            yield queryRunner.addColumn(this.tableName, new typeorm_1.TableColumn({
                name: "price",
                type: "varchar",
                isNullable: false,
                isUnique: false,
            }));
        });
    }
}
exports.ProductChangeColumn1686636732785 = ProductChangeColumn1686636732785;
//# sourceMappingURL=1686636732785-product-change-column.js.map