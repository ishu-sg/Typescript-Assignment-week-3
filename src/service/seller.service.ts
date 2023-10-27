import bcrypt from "bcrypt";
import createError from "http-errors";
import i18n from "i18n";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "@config/secret";
import constant from "@config/constant";
import { Seller } from "@database/model/seller.model";
import { RegisterSeller,LoggedInSeller } from "@type/seller";
import { logger, traceDecorator } from "@studiographene/nodejs-telemetry";
import { dbConnection } from "../database/db-connection";
import { CartItem } from '../database/model/cart-item.model';
import { Product } from '../database/model/product.model';
export class SellerService {


@traceDecorator
public async register(
  name:string,
  email:string,
  password:string
): Promise<RegisterSeller> {
        const queryRunner=dbConnection.createQueryRunner();
        await queryRunner.connect();
        const sellerRepository=queryRunner.manager.getRepository(Seller)
        try {
                await queryRunner.startTransaction()
                const sellerExists = await sellerRepository.findOne({
                where: {
                    email: email.toLowerCase(),
                },
                });
                if (sellerExists) {
                     throw new createError.BadRequest(i18n.__("seller_already_exists"));
                }
                const hashedPassword = await this.getEncryptedPassword(password);
                const seller = await sellerRepository.save({
                        name:name,
                        password:hashedPassword,
                        email:email,
                })

                await queryRunner.commitTransaction()
            return seller;
        } catch (error) {
             await queryRunner.rollbackTransaction()
        }
        finally{
             await queryRunner.release()
        }
}



  @traceDecorator
  public async login(email: string, password: string): Promise<LoggedInSeller> {
            const queryRunner=dbConnection.createQueryRunner();
            await queryRunner.connect();
            const sellerRepository=queryRunner.manager.getRepository(Seller)
            const seller = await sellerRepository.findOne({
            where: {
                email: email.toLowerCase()
            },
            });
            if (!seller) {
                throw new createError.NotFound(i18n.__("seller_not_found"));
            }
            const validPassword = await bcrypt.compare(password, seller.password);
            if (!validPassword) {
                throw new createError.BadRequest(i18n.__("incorrect_password"));
            }
            const token = jwt.sign({ id:seller.id,email: seller.email,role:"seller"}, JWT_SECRET);
            return {
               token
            };
  }

  @traceDecorator
  private async getEncryptedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(constant.SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }


}