import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import { RegisterUser } from "@type/user";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ unique: false })
  public name: string;

  @Column({ unique: false })
  public email: string;
  
  @Column()
  public password: string;


  // @OneToMany(()=>Orderlist,(orderlist)=>orderlist.user,{cascade:true})
  // public order_lists:Orderlist[];

  // @OneToMany(()=>Order,(order)=>order.user,{cascade:true})
  // public orders:Order[];
}

