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
exports.AddTimestampz1686728052664 = void 0;
const typeorm_1 = require("typeorm");
class AddTimestampz1686728052664 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.changeColumn("product", "description", new typeorm_1.TableColumn({
                name: "description",
                type: "numeric"
            }));
            yield queryRunner.addColumns("user", [
                new typeorm_1.TableColumn({
                    name: "created_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                }),
                new typeorm_1.TableColumn({
                    name: "updated_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                })
            ]);
            yield queryRunner.addColumns("order_item", [
                new typeorm_1.TableColumn({
                    name: "created_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                }),
                new typeorm_1.TableColumn({
                    name: "updated_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                })
            ]);
            yield queryRunner.addColumns("cart_item", [
                new typeorm_1.TableColumn({
                    name: "created_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                }),
                new typeorm_1.TableColumn({
                    name: "updated_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                })
            ]);
            yield queryRunner.addColumns("product", [
                new typeorm_1.TableColumn({
                    name: "created_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                }),
                new typeorm_1.TableColumn({
                    name: "updated_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                }),
                new typeorm_1.TableColumn({
                    name: "ratings",
                    type: "numeric",
                    isNullable: false,
                })
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumns("user", ["created_at", "updated_at"]);
            yield queryRunner.dropColumns("product", ["created_at", "updated_at"]);
            yield queryRunner.dropColumns("order_item", ["created_at", "updated_at"]);
            yield queryRunner.dropColumns("cart_item", ["created_at", "updated_at"]);
        });
    }
}
exports.AddTimestampz1686728052664 = AddTimestampz1686728052664;
//# sourceMappingURL=1686728052664-add-timestampz.js.map