import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
ManyToOne
  } from "typeorm";
  
  @Entity("product")
  export class Product {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
  
    @Column({ unique: false })
    public name: string;
  
    @Column({ unique: false })
    public price: number;
    
    @Column({ unique: false })
    public description: string;

    // @OneToMany(()=>Orderlist,(orderlist)=>orderlist.user,{cascade:true})
    // public order_lists:Orderlist[];
  
    // @OneToMany(()=>Order,(order)=>order.user,{cascade:true})
    // public orders:Order[];
  }