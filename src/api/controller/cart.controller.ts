import express,{ Request, Response } from "express";
import i18n from "i18n";
import jwt from "jsonwebtoken";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { CartService } from "@service/cart.service";
import { traceDecorator } from "@studiographene/nodejs-telemetry";
import { DecodedToken } from "@type/user";
import { string } from "@hapi/joi";
import multer from 'multer';
import { JWT_SECRET } from "@config/secret";



export class CartController {
  private responseParser: ResponseParser;
  private cartService: CartService;

  constructor() {
    this.responseParser = new ResponseParser();
    this.cartService = new CartService();
  }

  @traceDecorator
  public addItem = async (req: Request, res: Response): Promise<void> => {
        const {
          body: {productId,quantity}
        } = req;
        const token = req.header("Authorization");
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const response = await this.cartService.addItem(
        productId,
        quantity,
        (<DecodedToken>decodedToken).email
        );
        this.responseParser
          .setStatus(true)
          .setHttpCode(constant.HTTP_STATUS_CREATED)
          .setBody(response)
          .setMessage(i18n.__("item_added"))
          .send(res);
  };

  @traceDecorator
  public updateCart=async (req:Request, res:Response):Promise<void>=>{
        const{
          params: {itemId}
        }=req;
        const response = await this.cartService.updateCart(req.body.quantity,itemId);
        this.responseParser
          .setStatus(true)
          .setHttpCode(constant.HTTP_STATUS_CREATED)
          .setBody(response)
          .setMessage(i18n.__("cart_updated"))
          .send(res);
  }
  @traceDecorator
  public deleteCartItem=async (req:Request, res:Response):Promise<void>=>{
        const{
          params: {itemId}
        }=req;
        const response = await this.cartService.deleteCartItem(itemId);
        this.responseParser
          .setStatus(true)
          .setHttpCode(constant.HTTP_STATUS_CREATED)
          .setBody(response)
          .setMessage(i18n.__("item_deleted"))
          .send(res);
  }

  @traceDecorator
  public getCartItems=async (req:Request,res:Response):Promise<void>=>{
        const response = await this.cartService.getCartItem();
        this.responseParser
          .setStatus(true)
          .setHttpCode(constant.HTTP_STATUS_CREATED)
          .setBody(response)
          .setMessage(i18n.__("AllCartItems"))
          .send(res);
  }
}