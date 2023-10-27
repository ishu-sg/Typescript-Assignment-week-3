import express,{ Request, Response } from "express";
import i18n from "i18n";
import jwt from "jsonwebtoken";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { UserService } from "@service/user.service";
import { traceDecorator } from "@studiographene/nodejs-telemetry";
import { string } from "@hapi/joi";
import multer from 'multer';
import { JWT_SECRET } from "@config/secret";



export class UserController {
  private responseParser: ResponseParser;
  private userService: UserService;

  constructor() {
    this.responseParser = new ResponseParser();
    this.userService = new UserService();
  }

  @traceDecorator
  public register = async (req: Request, res: Response): Promise<void> => {
        const {
          body: {name,email,password},
        } = req;
        console.log(req.body)
        const response = await this.userService.register(
          name,
        email,
        password
        );
        this.responseParser
          .setStatus(true)
          .setHttpCode(constant.HTTP_STATUS_CREATED)
          .setBody(response)
          .setMessage(i18n.__("user registered"))
          .send(res);
  };



  @traceDecorator
  public login = async (req: Request, res: Response): Promise<void> => {
        const {
          body: {email,password}
        } = req;
        const response = await this.userService.login(
        email,
        password
        );
        this.responseParser
          .setStatus(true)
          .setHttpCode(constant.HTTP_STATUS_CREATED)
          .setBody(response)
          .setMessage(i18n.__("user registered"))
          .send(res);
  };


  @traceDecorator
  public download = async (req: Request, res: Response): Promise<void> => {
res.send("file uploaded")
  };

}
