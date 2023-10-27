import express,{ Request, Response } from "express";
import i18n from "i18n";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { SellerService } from "@service/seller.service";
import { traceDecorator } from "@studiographene/nodejs-telemetry";




export class SellerController {
  private responseParser: ResponseParser;
  private sellerService: SellerService;

  constructor() {
    this.responseParser = new ResponseParser();
    this.sellerService = new SellerService();
  }

  @traceDecorator
  public register = async (req: Request, res: Response): Promise<void> => {
            const {
            body: {name,email,password},
            } = req;
            const response = await this.sellerService.register(
            name,
            email,
            password
            );
            this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_CREATED)
            .setBody(response)
            .setMessage(i18n.__("seller registered"))
            .send(res);
  };



  @traceDecorator
  public login = async (req: Request, res: Response): Promise<void> => {
            const {
            body: {email,password}
            } = req;
            const response = await this.sellerService.login(
            email,
            password
            );
            this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_CREATED)
            .setBody(response)
            .setMessage(i18n.__("seller logged in"))
            .send(res);
  };


  @traceDecorator
  public download = async (req: Request, res: Response): Promise<void> => {
res.send("file uploaded")
  };

}
