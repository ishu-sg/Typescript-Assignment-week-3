"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const user_model_1 = require("@database/model/user.model");
const db_connection_1 = require("@database/db-connection");
exports.UserRepo = db_connection_1.dbConnection.getRepository(user_model_1.User).extend({
    findByName(name) {
        return this.createQueryBuilder("user")
            .select(["user.firstName", "user.lastName", "user.email"])
            .where("user.firstName = :name", { name })
            .orWhere("user.lastName = :name", { name })
            .getMany();
    },
});
//# sourceMappingURL=user.repository.js.map