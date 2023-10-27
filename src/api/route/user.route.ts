import express from "express";
import { UserController } from "@api/controller/user.controller";
import { AuthenticateRequest } from "@middleware/authenticate-request";
import { HttpRequestValidator } from "@middleware/http-request-validator";
import { register,login } from "@api/validator/user.validator";
import {storage} from '../../middleware/fileupload';

class UserRoute {
  public router: express.Router = express.Router();
  private userController: UserController;
  private authenticate;
  private httpRequestValidator: HttpRequestValidator;

  constructor() {
    this.userController = new UserController();
    const authMiddleware = new AuthenticateRequest();
    this.authenticate = authMiddleware.validate;
    this.httpRequestValidator = new HttpRequestValidator();
    this.assign();
  }
  private assign(): void {
   
    this.router.post(
      "/register",
     this.httpRequestValidator.validate("body",register),
      this.userController.register,
    );

    this.router.post(
      "/login",
     this.httpRequestValidator.validate("body",login),
     this.authenticate,
      this.userController.login,
    );

    this.router.post(
      "/download",
      storage,
      this.userController.download,
    );
  }
}

export default new UserRoute().router;