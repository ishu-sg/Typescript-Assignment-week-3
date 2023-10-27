import bcrypt from "bcrypt";
import createError from "http-errors";
import i18n from "i18n";
import { Between ,Like} from "typeorm";
import { logger, traceDecorator } from "@studiographene/nodejs-telemetry";
import { dbConnection } from "../database/db-connection";
import { Product } from '../database/model/product.model';
import { CartRepo } from "@database/repository/product.repository";
import { CartItem } from '../database/model/cart-item.model';
export class ProductService {

@traceDecorator
public async getProduct(min?:number,max?:number):Promise<any>{
  const queryRunner=dbConnection.createQueryRunner();
  await queryRunner.connect();
  const productRepository=queryRunner.manager.getRepository(Product);
        if(!min||!max){
            try {
                await queryRunner.startTransaction();
                const productdata= await CartRepo.left();
                console.log(productdata);
                await queryRunner.commitTransaction();
                return productdata;
            }catch (error) {
                await queryRunner.rollbackTransaction()
                throw new createError.BadRequest(i18n.__("badinput"));
                }
            finally{
            await queryRunner.release()
            }
        }
        else{
            try {
                await queryRunner.startTransaction();
                const productdata=productRepository.findBy({price:Between(min-1,max+1)});
                await queryRunner.commitTransaction();
                return productdata;
            }catch (error) {
                await queryRunner.rollbackTransaction()
                throw new createError.BadRequest(i18n.__("badinput"));
                }
            finally{
            await queryRunner.release()
            }

        }
    }

    @traceDecorator
    public async deleteProduct(productId:string):Promise<void>{
    const queryRunner=dbConnection.createQueryRunner();
    await queryRunner.connect();
    const productRepository=queryRunner.manager.getRepository(Product);
                try {
                    const productdata=productRepository.delete({id:productId});
                }catch (error) {
                    throw new createError.BadRequest(i18n.__("badinput"));
                    }
                finally{
                await queryRunner.release()
                }
        
        }


    @traceDecorator
    public async searchProduct(name:string):Promise<Partial<Product[]>>{
      const queryRunner=dbConnection.createQueryRunner();
      await queryRunner.connect();
      const productRepository=queryRunner.manager.getRepository(Product);
            try {
                await queryRunner.startTransaction();
                const productdata=productRepository.find({where:{name:Like(`%${name}%`)}});
                await queryRunner.commitTransaction();
                return productdata;
            }catch (error) {
                await queryRunner.rollbackTransaction()
                throw new createError.BadRequest(i18n.__("badinput"));
                }
            finally{
            await queryRunner.release()
            }
            
        }
    

    @traceDecorator
    public async updatePrice(price:number,productId:string):Promise<Partial<Product>>{
        const queryRunner=dbConnection.createQueryRunner();
        await queryRunner.connect();
        const productRepository=queryRunner.manager.getRepository(Product);
                try {
                        await queryRunner.startTransaction();
                        await productRepository.update(
                            {id:productId},
                            {price:price}
                        );
                        const productdata=productRepository.findOne({where:{id:productId}})
                        await queryRunner.commitTransaction();
                        return productdata;
                }catch (error) {
                        await queryRunner.rollbackTransaction()
                        throw new createError.BadRequest(i18n.__("badinput"));
                    }
                finally{
                    await queryRunner.release()
                }       
        }   
        
    @traceDecorator
    public async addProduct (name:string,price:number,description:string):Promise<Partial<Product>>{
        const queryRunner=dbConnection.createQueryRunner();
        await queryRunner.connect();
        const productRepository=queryRunner.manager.getRepository(Product);
                try {
                        await queryRunner.startTransaction();
                        const productdata= await productRepository.save({
                          name:name,
                          price:price,
                          description:description
                        })

                        await queryRunner.commitTransaction();
                        return productdata;
                }catch (error) {
                        await queryRunner.rollbackTransaction()
                        throw new createError.BadRequest(i18n.__("badinput"));
                    }
                finally{
                    await queryRunner.release()
                }       
        }  
}