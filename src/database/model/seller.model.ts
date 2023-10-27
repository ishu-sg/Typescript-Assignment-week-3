import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity("seller")
  export class Seller {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
  
    @Column({ unique: false })
    public name: string;
  
    @Column({ unique: false })
    public email: string;
    
    @Column()
    public password: string;

    @CreateDateColumn({
        select: false,
      })
      public createdAt: Date;
    
    @UpdateDateColumn({
        select: false,
      })
      public updatedAt: Date;
  }