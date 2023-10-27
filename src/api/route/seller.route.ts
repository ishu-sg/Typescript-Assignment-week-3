import express from "express";
import { HttpRequestValidator } from "@middleware/http-request-validator";
import { SellerController } from "@api/controller/seller.controller";
import { AuthenticateRequest } from "@middleware/authenticate-request";
import { login,register } from "@api/validator/seller.validator";
import {storage} from '../../middleware/fileupload';

class SellerRoute {
  public router: express.Router = express.Router();
  private sellerController: SellerController;
  private httpRequestValidator: HttpRequestValidator;
  private authenticate;

  constructor() {
    this.sellerController = new SellerController();
    this.httpRequestValidator = new HttpRequestValidator();
    const authMiddleware = new AuthenticateRequest();
    this.authenticate = authMiddleware.validateSeller;
    this.assign();
  }
  private assign(): void {
   
    this.router.post(
      "/register",
     this.httpRequestValidator.validate("body",register),
      this.sellerController.register,
    );

    this.router.post(
      "/login",
     this.httpRequestValidator.validate("body",login),
      this.sellerController.login,
    );

    this.router.post(
      "/download",
      storage,
      this.sellerController.download,
    );
  }
}

export default new SellerRoute().router;