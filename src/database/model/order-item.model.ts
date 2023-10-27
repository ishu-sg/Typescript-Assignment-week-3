import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
ManyToOne
  } from "typeorm";
  import { CartItem } from "./cart-item.model";
  import { User } from "./user.model";
  import { Order } from "./order.model";
import { Product } from "./product.model";
  @Entity("order_item")
  export class OrderItem {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ unique: false })
    public orderId: string;
  
    @Column({ unique: false })
    public cartItemId: string;

    @ManyToOne(()=>Order)
    @JoinColumn({name:"order_id"})
    public order:Order;

    @ManyToOne(()=>CartItem)
    @JoinColumn({name:"cart_item_id"})
    public cartitem:CartItem;
    // @OneToMany(()=>Orderlist,(orderlist)=>orderlist.user,{cascade:true})
    // public order_lists:Orderlist[];
  
    // @OneToMany(()=>Order,(order)=>order.user,{cascade:true})
    // public orders:Order[];
  }