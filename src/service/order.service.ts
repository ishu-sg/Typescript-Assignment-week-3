import bcrypt from "bcrypt";
import createError from "http-errors";
import i18n from "i18n";
 import { OrderPlaced} from "@type/user";
import { User } from "@database/model/user.model";
import { logger, traceDecorator } from "@studiographene/nodejs-telemetry";
import { dbConnection } from "../database/db-connection";
import { CartItem } from '../database/model/cart-item.model';
import { Order } from "@database/model/order.model";
import { OrderItem } from "@database/model/order-item.model";
export class OrderService {


  @traceDecorator
  public async order(email: string): Promise<OrderPlaced> {
    const queryRunner=dbConnection.createQueryRunner();
    await queryRunner.connect();
    const userRepository=queryRunner.manager.getRepository(User)
    const orderRepository=queryRunner.manager.getRepository(Order)
const orderItemRepository=queryRunner.manager.getRepository(OrderItem)
const cartitemRepository=queryRunner.manager.getRepository(CartItem);
    try{
      await queryRunner.startTransaction();
    const user = await userRepository.findOne({
      where: {
        email: email.toLowerCase()
      },
    });
    if (!user) {
      throw new createError.NotFound(i18n.__("user_not_found"));
    }
  const orderdata=await orderRepository.save({
    userId:user.id
  });
  const cartitemdata=await cartitemRepository.find({where:{userId:user.id}})
const x=[];
  for (const val of cartitemdata) {
     const temp={
      orderId:orderdata.id,
      cartItemId:val.id
    }
    x.push(temp)
  }
  const orderitemdata=await orderItemRepository.save(x)

await queryRunner.commitTransaction();
return {orderId:orderdata.id,userId:orderdata.userId,cartItems:cartitemdata}
  }
  catch (error) {
    await queryRunner.rollbackTransaction();
    }
    finally{
    await queryRunner.release();
    }
  }
  @traceDecorator
  public async cancelOrder(email: string): Promise<void> {
    const queryRunner=dbConnection.createQueryRunner();
    await queryRunner.connect();
    const userRepository=queryRunner.manager.getRepository(User)
    const orderRepository=queryRunner.manager.getRepository(Order)
const orderItemRepository=queryRunner.manager.getRepository(OrderItem)
const cartitemRepository=queryRunner.manager.getRepository(CartItem);
    try{
      await queryRunner.startTransaction();
    const user = await userRepository.findOne({
      where: {
        email: email.toLowerCase()
      },
    });
    if (!user) {
      throw new createError.NotFound(i18n.__("user_not_found"));
    }
  const orderdata=await orderRepository.findOne({where:{
    userId:user.id
  }})
  await orderItemRepository.delete({orderId:orderdata.id})
  await orderRepository.delete({userId:user.id})
await queryRunner.commitTransaction();
  }
  catch (error) {
    await queryRunner.rollbackTransaction();
    }
    finally{
    await queryRunner.release();
    }
  }




}