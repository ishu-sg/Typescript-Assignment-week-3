import express from "express";
import { HttpRequestValidator } from "@middleware/http-request-validator";
import { addItem ,updateCart} from "@api/validator/cart.validator";
import { CartController } from "@api/controller/cart.controller";
import { AuthenticateRequest } from "@middleware/authenticate-request";

class CartRoute {
  public router: express.Router = express.Router();
  private cartController: CartController;
 private httpRequestValidator: HttpRequestValidator;
  private authenticate;

  constructor() {
    this.cartController = new CartController();
    this.httpRequestValidator = new HttpRequestValidator();
    const authMiddleware = new AuthenticateRequest();
    this.authenticate = authMiddleware.validate;
    this.assign();
  }
  private assign(): void {

    this.router.post(
      "/items",
      this.authenticate,
     this.httpRequestValidator.validate("body",addItem),
      this.cartController.addItem,
    );

    this.router.put(
      "/items/:itemId",
      this.authenticate,
     this.httpRequestValidator.validate("body",updateCart),
      this.cartController.updateCart,
    );

    this.router.delete(
      "/items/:itemId",
      this.authenticate,
      this.cartController.deleteCartItem,
    );

    this.router.get(
      "/",
      this.cartController.getCartItems,
    );
  }
}

export default new CartRoute().router;