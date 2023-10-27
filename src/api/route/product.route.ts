import express from "express";
import { HttpRequestValidator } from "@middleware/http-request-validator";
import { AuthenticateRequest } from "@middleware/authenticate-request";
import { ProductController } from "@api/controller/product.controller";
import { addProduct,updatePrice,deleteProduct } from "@api/validator/product.validator";
import {storage} from '../../middleware/fileupload';
import { string } from "@hapi/joi";

class ProductRoute {
  public router: express.Router = express.Router();
  private productController: ProductController;
  private httpRequestValidator: HttpRequestValidator;
  private authenticate;
  private authenticateSeller;


  constructor() {
    this.productController = new ProductController();
    this.httpRequestValidator = new HttpRequestValidator();
    const authMiddleware = new AuthenticateRequest();
    this.authenticate = authMiddleware.validate;
    this.authenticateSeller = authMiddleware.validateSeller;
    this.assign();
  }
  private assign(): void {
    this.router.post(
        "/",
        this.authenticateSeller,
     this.httpRequestValidator.validate("body",addProduct),
        this.productController.addProduct,
      );
  this.router.get(
      "/",
      // this.authenticate,
      this.productController.getProduct,
    );
  this.router.get(
        "/:name",
        this.authenticate,
        this.productController.searchProduct,
        );
  this.router.put(
        "/:productId",
        this.authenticateSeller,
     this.httpRequestValidator.validate("body",updatePrice),
        this.productController.updatePrice,
    );
    this.router.delete(
      "/:productId",
      this.authenticateSeller,
     this.httpRequestValidator.validate("params",deleteProduct),
      this.productController.deleteProduct,
  );
  }
}

// /list
// {
//   product:[{}],
//   filters:[{
//     color:['red','black'],
//     type:[]
//   }]
// }

// /list 
// {body:{filters:{
//   color:'red'
// }}}





export default new ProductRoute().router;