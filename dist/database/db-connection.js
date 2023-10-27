"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const secret_1 = require("../config/secret");
exports.dbConnection = new typeorm_1.DataSource({
    type: "postgres",
    host: secret_1.TYPEORM_HOST,
    port: Number(secret_1.TYPEORM_PORT),
    username: secret_1.TYPEORM_USERNAME,
    password: secret_1.TYPEORM_PASSWORD,
    database: secret_1.TYPEORM_DATABASE,
    entities: [path_1.default.resolve(`${__dirname}/model/*.{js,ts}`)],
    migrations: [`${__dirname}/migration/*`],
    migrationsTableName: "migrations",
    synchronize: false,
    logging: Boolean(secret_1.TYPEORM_LOGGING),
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    migrationsRun: true,
});
//# sourceMappingURL=db-connection.js.map