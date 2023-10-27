"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const authenticate_request_1 = require("@middleware/authenticate-request");
// import BaseRoute from "./base.route";
// import CmsRoute from "./cms.route";
const user_route_1 = __importDefault(require("./user.route"));
const order_route_1 = __importDefault(require("./order.route"));
const cart_route_1 = __importDefault(require("./cart.route"));
const product_route_1 = __importDefault(require("./product.route"));
const seller_route_1 = __importDefault(require("./seller.route"));
class Routes {
    constructor() {
        const authMiddleware = new authenticate_request_1.AuthenticateRequest();
        this.authenticate = authMiddleware.validate;
    }
    routes(app) {
        // resource and routes mapping comes here
        // app.use("/cms",this.authenticate,CmsRoute);
        // app.use(BaseRoute);
        app.use("/users", user_route_1.default),
            app.use("/order", order_route_1.default);
        app.use("/cart", cart_route_1.default);
        app.use("/product", product_route_1.default);
        app.use("/seller", seller_route_1.default);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map