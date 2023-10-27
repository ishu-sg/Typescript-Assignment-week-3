import express,{ Request, Response } from "express";
import i18n from "i18n";
import jwt from "jsonwebtoken";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { OrderService } from "@service/order.service";
import { traceDecorator } from "@studiographene/nodejs-telemetry";
import { JWT_SECRET } from "@config/secret";
import { DecodedToken } from "@type/user";



export class OrderController {
  private responseParser: ResponseParser;
  private orderService: OrderService;

  constructor() {
    this.responseParser = new ResponseParser();
    this.orderService = new OrderService();
  }

  @traceDecorator
  public order = async (req: Request, res: Response): Promise<void> => {
        const token = req.header("Authorization");
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const response = await this.orderService.order((<DecodedToken>decodedToken).email);
        // sendResponse();

    // function sendResponse() {
      this.responseParser
        .setStatus(true)
        .setHttpCode(constant.HTTP_STATUS_CREATED)
        .setBody(response)
        .setMessage(i18n.__("order_placed"))
        .send(res);
    // }
  };
//remove any from the project
  @traceDecorator
  public cancelOrder = async (req: Request, res: Response): Promise<void> => {
        const token = req.header("Authorization");
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const response = await this.orderService.cancelOrder((<DecodedToken>decodedToken).email);
        this.responseParser
          .setStatus(true)
          .setHttpCode(constant.HTTP_STATUS_CREATED)
          .setBody(response)
          .setMessage(i18n.__("order_cancelled"))
          .send(res);
  };

}
