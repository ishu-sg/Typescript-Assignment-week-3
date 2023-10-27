import { Application } from "express";

import { AuthenticateRequest } from "@middleware/authenticate-request";

// import BaseRoute from "./base.route";
// import CmsRoute from "./cms.route";
import UserRoute from "./user.route";
import OrderRoute from "./order.route";
import CartRoute from "./cart.route";
import ProductRoute from "./product.route";
import SellerRoute from "./seller.route";
export class Routes {
  private authenticate;
  constructor() {
const authMiddleware = new AuthenticateRequest();
    this.authenticate = authMiddleware.validate;
  }

  public routes(app: Application): void {
    // resource and routes mapping comes here
    // app.use("/cms",this.authenticate,CmsRoute);
    // app.use(BaseRoute);
    app.use("/users",UserRoute),
    app.use("/order",OrderRoute)
    app.use("/cart",CartRoute)
    app.use("/product",ProductRoute)
    app.use("/seller",SellerRoute)
  
  }  
}