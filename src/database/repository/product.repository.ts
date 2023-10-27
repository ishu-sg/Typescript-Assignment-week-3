import { Product } from '@database/model/product.model';
import { CartItem } from '@database/model/cart-item.model';
import { dbConnection } from "@database/db-connection";
import { QueryRunner } from 'typeorm';

export const CartRepo = dbConnection.getRepository(CartItem).extend({
  async left() {
    return this.createQueryBuilder('CartItem')
    .leftJoinAndSelect('CartItem.product', "product")
    .select(["CartItem.productId","product.name"])
    .getMany();
  },
});










// await listingRepo
//     .createQueryBuilder('listing')
//     .leftJoinAndSelect('listing.site', 'site')
//     .select(['listing.listing_id', 'site.marketplace_id'])
//     .getMany();