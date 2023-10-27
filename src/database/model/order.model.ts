import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
ManyToOne
  } from "typeorm";
  import { User } from "./user.model";
  @Entity("order")
  export class Order {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
  
    @Column({ unique: false })
    public userId: string;

    @CreateDateColumn({
        select: false,
      })
      public createdAt: Date;
    
    @UpdateDateColumn({
        select: false,
      })
      public updatedAt: Date;

    @ManyToOne(()=>User)
    @JoinColumn({name:"user_id"})
    public user:User;

  }