import express from "express";
import { OrderController } from "@api/controller/order.controller";
import { HttpRequestValidator } from "@middleware/http-request-validator";
import { AuthenticateRequest } from "@middleware/authenticate-request";

class OrderRoute {
  public router: express.Router = express.Router();
  private orderController: OrderController;
 private httpRequestValidator: HttpRequestValidator;
  private authenticate;

  constructor() {
    this.orderController = new OrderController();
    this.httpRequestValidator = new HttpRequestValidator();
    const authMiddleware = new AuthenticateRequest();
    this.authenticate = authMiddleware.validate;
    this.assign();
  }
  private assign(): void {

    this.router.post(
      "/",
      this.authenticate,
      this.orderController.order,
    );
    this.router.delete(
      "/",
      this.authenticate,
      this.orderController.cancelOrder,
    );

  }
}

export default new OrderRoute().router;