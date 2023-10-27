import { MigrationInterface, QueryRunner,TableColumn} from "typeorm"

export class AddTimestampz1686728052664 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("product","description",new TableColumn({
            name: "description",
            type: "numeric"
          }))
        await queryRunner.addColumns("user",[
                new TableColumn({
                    name: "created_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                  }
                ),
                new TableColumn({
                    name: "updated_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                  }
                )
              ]
                
            )
            await queryRunner.addColumns("order_item",[
                new TableColumn({
                    name: "created_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                  }
                ),
                new TableColumn({
                    name: "updated_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                  }
                )
              ]
                
            )
            await queryRunner.addColumns("cart_item",[
                new TableColumn({
                    name: "created_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                  }
                ),
                new TableColumn({
                    name: "updated_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                  }
                )
              ]
                
            )
            await queryRunner.addColumns("product",[
                new TableColumn({
                    name: "created_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                  }
                ),
                new TableColumn({
                    name: "updated_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                  }
                ),
                new TableColumn({
                    name: "ratings",
                    type: "numeric",
                    isNullable: false,
                  }
                )
              ]
                
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("user",["created_at","updated_at"]); 
        await queryRunner.dropColumns("product",["created_at","updated_at"]);        
        await queryRunner.dropColumns("order_item",["created_at","updated_at"]);        
        await queryRunner.dropColumns("cart_item",["created_at","updated_at"]);        
    }

}
