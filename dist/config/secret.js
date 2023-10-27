"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMEZONE = exports.EMAIL_APP_PASSWORD = exports.FROM_EMAIL = exports.AWS_REGION = exports.AWS_SECRET_ACCESS_KEY = exports.AWS_ACCESS_KEY = exports.JWT_SECRET = exports.PORT = exports.SENTRY_DSN = exports.SWAGGER_URL = exports.TYPEORM_LOGGING = exports.TYPEORM_PORT = exports.TYPEORM_DATABASE = exports.TYPEORM_PASSWORD = exports.TYPEORM_USERNAME = exports.TYPEORM_HOST = exports.APP_NAME = exports.APP_VERSION = exports.TYPEORM_CONNECTION = exports.ENVIRONMENT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.ENVIRONMENT = process.env.NODE_ENV;
exports.TYPEORM_CONNECTION = process.env.TYPEORM_HOST;
exports.APP_VERSION = process.env.npm_package_version;
exports.APP_NAME = process.env.npm_package_name;
_a = process.env, exports.TYPEORM_HOST = _a.TYPEORM_HOST, exports.TYPEORM_USERNAME = _a.TYPEORM_USERNAME, exports.TYPEORM_PASSWORD = _a.TYPEORM_PASSWORD, exports.TYPEORM_DATABASE = _a.TYPEORM_DATABASE, exports.TYPEORM_PORT = _a.TYPEORM_PORT, exports.TYPEORM_LOGGING = _a.TYPEORM_LOGGING, exports.SWAGGER_URL = _a.SWAGGER_URL, exports.SENTRY_DSN = _a.SENTRY_DSN, exports.PORT = _a.PORT, exports.JWT_SECRET = _a.JWT_SECRET, exports.AWS_ACCESS_KEY = _a.AWS_ACCESS_KEY, exports.AWS_SECRET_ACCESS_KEY = _a.AWS_SECRET_ACCESS_KEY, exports.AWS_REGION = _a.AWS_REGION, exports.FROM_EMAIL = _a.FROM_EMAIL, exports.EMAIL_APP_PASSWORD = _a.EMAIL_APP_PASSWORD, exports.TIMEZONE = _a.TIMEZONE;
//# sourceMappingURL=secret.js.map