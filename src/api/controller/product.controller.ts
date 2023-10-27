import express,{ Request, Response } from "express";
import i18n from "i18n";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { traceDecorator } from "@studiographene/nodejs-telemetry";
import { ProductService } from "@service/product.service";

export class ProductController {
  private responseParser: ResponseParser;
  private productService: ProductService;

  constructor() {
    this.responseParser = new ResponseParser();
    this.productService = new ProductService();
  }

  @traceDecorator
  public addProduct = async (req: Request, res: Response): Promise<void> => {
            const {
                body:{name,price,description}
            }=req;
            const response = await this.productService.addProduct(name,price,description);
            this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_CREATED)
            .setBody(response)
            .setMessage(i18n.__("products_added"))
            .send(res);
  };


  @traceDecorator
  public deleteProduct = async (req: Request, res: Response): Promise<void> => {
            const {
                params:{productId}
            }=req;
            const response = await this.productService.deleteProduct(productId);
            this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_CREATED)
            .setBody(response)
            .setMessage(i18n.__("products_deleted"))
            .send(res);
  };

 
  @traceDecorator
  public getProduct = async (req: Request, res: Response): Promise<void> => {
            const {
                query:{min,max}
            }=req;
            const response = await this.productService.getProduct(+min,+max);
            this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_CREATED)
            .setBody(response)
            .setMessage(i18n.__("products_retrieved"))
            .send(res);
  };

  @traceDecorator
  public searchProduct = async (req: Request, res: Response): Promise<void> => {
            const {
                params:{name}
            }=req;
            const response = await this.productService.searchProduct(name);
            this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_CREATED)
            .setBody(response)
            .setMessage(i18n.__("products_retieved"))
            .send(res);
  };


  @traceDecorator
  public updatePrice = async (req: Request, res: Response): Promise<void> => {
            const {
                body:{price},
                params:{productId}
            }=req;
            const response = await this.productService.updatePrice(price,productId);
            this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_CREATED)
            .setBody(response)
            .setMessage(i18n.__("products_retieved"))
            .send(res);
  };

}
