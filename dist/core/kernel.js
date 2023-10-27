"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kernel = void 0;
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const i18n_1 = __importDefault(require("i18n"));
const Sentry = __importStar(require("@sentry/node"));
const request_id_1 = require("@middleware/request-id");
const error_1 = __importDefault(require("@middleware/error"));
const swagger_document_1 = __importDefault(require("@util/swagger-document"));
const secret_1 = require("@config/secret");
const constant_1 = __importDefault(require("@config/constant"));
const path_1 = __importDefault(require("path"));
const request_ctx_middleware_1 = require("@middleware/request-ctx-middleware");
const db_connection_1 = require("@database/db-connection");
const nodejs_telemetry_1 = require("@studiographene/nodejs-telemetry");
class Kernel {
    constructor() {
        this.requestId = new request_id_1.RequestIDMiddleware();
    }
    initBodyParser(app) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
    }
    addRequestId(app) {
        app.use(this.requestId.assign);
    }
    attachRequestContext(app) {
        app.use(request_ctx_middleware_1.requestCtx);
    }
    errorMiddleware(app) {
        app.use(error_1.default);
    }
    databaseConnection() {
        // establish database connection
        return db_connection_1.dbConnection
            .initialize()
            .then(() => {
            nodejs_telemetry_1.logger.info("Data Source has been initialized!", "Kernel.databaseConnection");
        })
            .catch((err) => {
            nodejs_telemetry_1.logger.error("Error during Data Source initialization:", "Kernel.databaseConnection", {
                data: { err },
            });
        });
    }
    initTranslation(app) {
        i18n_1.default.configure({
            locales: [constant_1.default.ENGLISH_LOCALE, constant_1.default.SPANISH_LOCALE],
            defaultLocale: constant_1.default.ENGLISH_LOCALE,
            queryParameter: "lang",
            directory: path_1.default.join(__dirname, "..", "..", "locales"),
        });
        app.use(i18n_1.default.init);
    }
    setupSwagger(app) {
        if (constant_1.default.PRODUCTION !== secret_1.ENVIRONMENT) {
            const swaggerSpecV1 = (0, swagger_jsdoc_1.default)(swagger_document_1.default);
            app.use("/docs", swagger_ui_express_1.default.serveFiles(swaggerSpecV1));
            app.get("/docs", (req, res) => {
                res.send(swagger_ui_express_1.default.generateHTML(swaggerSpecV1));
            });
        }
    }
    addCommonMiddleware(app) {
        app.use(this.requestId.assign);
        const corsOptions = {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
            allowedHeaders: "*",
            exposedHeaders: "*",
            optionsSuccessStatus: 200,
        };
        app.use((0, cors_1.default)(corsOptions));
    }
    initSentry(app) {
        Sentry.init({ dsn: secret_1.SENTRY_DSN });
        app.use(Sentry.Handlers.requestHandler());
    }
    sentryErrorHandler(app) {
        if (secret_1.SENTRY_DSN) {
            app.use(Sentry.Handlers.errorHandler());
        }
    }
}
exports.Kernel = Kernel;
//# sourceMappingURL=kernel.js.map