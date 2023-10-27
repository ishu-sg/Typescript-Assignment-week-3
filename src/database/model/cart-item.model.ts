import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToOne,
ManyToOne
  } from "typeorm";
  import { User } from "./user.model";
import { Product } from "./product.model";
  @Entity("cart_item")
  export class CartItem {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
  
    @Column({ unique: false })
    public userId: string;
  
    @Column({ unique: false })
    public productId: string;
    
    @Column({ unique: false })
    public quantity: string;

    @ManyToOne(()=>User)
    @JoinColumn({name:"user_id"})
    public user:User;

    @ManyToOne(()=>Product)
    @JoinColumn({name:"product_id"})
    public product:Product;
    // @OneToMany(()=>Orderlist,(orderlist)=>orderlist.user,{cascade:true})
    // public order_lists:Orderlist[];
  
    // @OneToMany(()=>Order,(order)=>order.user,{cascade:true})
    // public orders:Order[];
  }