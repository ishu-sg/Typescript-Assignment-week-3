import bcrypt from "bcrypt";
import createError from "http-errors";
import i18n from "i18n";
import { User } from "@database/model/user.model";
import { logger, traceDecorator } from "@studiographene/nodejs-telemetry";
import { dbConnection } from "../database/db-connection";
import { CartItem } from '../database/model/cart-item.model';
import { UpdateCart,AddedItem } from "@type/cart";
import { Product } from '../database/model/product.model';
export class CartService {

@traceDecorator
public async updateCart(quantity:string,itemId:string):Promise<UpdateCart>{
const queryRunner=dbConnection.createQueryRunner();
await queryRunner.connect();
const cartitemRepository=queryRunner.manager.getRepository(CartItem);
try{
  await queryRunner.startTransaction();
  await cartitemRepository.update(
          { productId:itemId},
          {  quantity:quantity}
        )
        const cartitemdata =await cartitemRepository.findOne({where:{
          productId:itemId
        }})
        
        await queryRunner.commitTransaction();
        return cartitemdata;
}
catch (error) {

  await queryRunner.rollbackTransaction()
  }
  finally{
  await queryRunner.release()
  }
}


@traceDecorator
public async deleteCartItem(itemId:string):Promise<void>{
  const queryRunner=dbConnection.createQueryRunner();
  await queryRunner.connect();
  const cartitemRepository=queryRunner.manager.getRepository(CartItem);
  try{
await queryRunner.startTransaction();
const cartitemdata=await cartitemRepository.delete({productId:itemId})
await queryRunner.commitTransaction();

  }
  catch (error) {
    await queryRunner.rollbackTransaction();
    }
    finally{
    await queryRunner.release();
    }
}

@traceDecorator
public async getCartItem():Promise<Partial<CartItem[]>>{
const queryRunner =dbConnection.createQueryRunner();
await queryRunner.connect();
const cartitemRepository=queryRunner.manager.getRepository(CartItem);
try{
    // await queryRunner.startTransaction();
    const cartitemdata=await cartitemRepository.find();
    // await queryRunner.commitTransaction();
    return cartitemdata;
}catch (error) {
    await queryRunner.rollbackTransaction();
    }
    finally{
    await queryRunner.release();
    }
}


@traceDecorator
public async addItem(
  productId:string,
  quantity:string,
  email:string
  ):Promise<AddedItem>{
const queryRunner=dbConnection.createQueryRunner();
await queryRunner.connect();
const cartItemRepository=queryRunner.manager.getRepository(CartItem);
const userRepository=queryRunner.manager.getRepository(User)

try{
  await queryRunner.startTransaction();
  const userdata=await userRepository.findOne({where:{
    email:email
  }})
const cartitemdata=await cartItemRepository.save({
  userId:userdata.id,
  productId:productId,
  quantity:quantity
}
)
await queryRunner.commitTransaction()
return cartitemdata;
}
catch (error) {
  await queryRunner.rollbackTransaction()
  throw new createError.BadRequest(i18n.__("badinputforaddingitemtocart"));
  }
  finally{
  await queryRunner.release()
  }
}


}