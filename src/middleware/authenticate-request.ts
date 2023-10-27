// Copyright (C) 2019 by StudioGraphene. All rights reserved.

import { Request, Response, NextFunction } from "express";
import i18n from "i18n";
import jwt, { decode } from "jsonwebtoken";
import createError from "http-errors";
import { DecodedToken } from "@type/user";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { logger } from "@studiographene/nodejs-telemetry";
import { JWT_SECRET } from "@config/secret";

declare module "express" {
  export interface Request {
    user: Record<string, unknown>;
  }
}

export class AuthenticateRequest {
  /**
   * Global middleware to check request is autneticated of not
   * @param req
   * @param res
   * @param next
   */
  public validate(req: Request, res: Response, next: NextFunction): void {
    const token = req.header("Authorization");

    if (!token) {
      const responseParser = new ResponseParser();
      responseParser
        .setHttpCode(constant.HTTP_STATUS_UNAUTHORIZED)
        .setStatus(false)
        .setResponseCode("unauthorized")
        .setMessage(i18n.__("unauthorized"))
        .setBody({})
        .send(res);
      return;
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
//session timeout feature added
    logger.debug("decoded-token", "AuthenticateRequest.validate", {
      decodedToken,
    });
    if (!decodedToken) {
      throw new createError.Unauthorized(i18n.__("invalidToken"));
    }
    console.log(decodedToken)
    if((<DecodedToken>decodedToken).role!=="user"){
      throw new createError.Unauthorized(i18n.__("invalidrole"));
    }
    if((<DecodedToken>decodedToken).email!==req.body.email){
      throw new createError.Unauthorized(i18n.__("invalid token"));
    }
    req.user = JSON.parse(JSON.stringify(decodedToken));

    // passing usr context to logger
    logger.userContext({ id: req.user.id });
    next();
  }

  public validateSeller(req: Request, res: Response, next: NextFunction): void {
    const token = req.header("Authorization");

    if (!token) {
      const responseParser = new ResponseParser();
      responseParser
        .setHttpCode(constant.HTTP_STATUS_UNAUTHORIZED)
        .setStatus(false)
        .setResponseCode("unauthorized")
        .setMessage(i18n.__("unauthorized"))
        .setBody({})
        .send(res);
      return;
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    logger.debug("decoded-token", "AuthenticateRequest.validate", {
      decodedToken,
    });
    if (!decodedToken) {
      throw new createError.Unauthorized(i18n.__("invalidToken"));
    }
    if((<DecodedToken>decodedToken).role!=="seller"){
      throw new createError.Unauthorized(i18n.__("invalidrole"));
    }
    if((<DecodedToken>decodedToken).email!==req.body.email){
      throw new createError.Unauthorized(i18n.__("invalid token"));
    }
    req.user = JSON.parse(JSON.stringify(decodedToken));
    next();
  }
}
