"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const secret_1 = require("@config/secret");
const SwaggerDocument = {
    swaggerDefinition: {
        info: {
            title: "REST API for E-Commerce Shopping Cart",
            version: "1.0.0",
            description: "This is the REST API for E-Commerce Shopping Cart",
        },
        host: `${secret_1.SWAGGER_URL}`,
        basePath: "/",
        securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "x-auth-token",
                scheme: "bearer",
                in: "header",
            },
        },
        schemes: ["https", "http"],
        consumes: ["application/json"],
        produces: ["application/json"],
    },
    explorer: true,
    apis: [path_1.default.join(__dirname, "..", "..", "swagger-doc", "*.yaml")],
};
exports.default = SwaggerDocument;
//# sourceMappingURL=swagger-document.js.map