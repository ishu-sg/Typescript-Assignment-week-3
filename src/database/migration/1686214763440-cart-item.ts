import { MigrationInterface, QueryRunner,Table,TableForeignKey } from "typeorm"

export class CartItem1686214763440 implements MigrationInterface {
    private readonly tableName="cart_item"
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: this.tableName,
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                  isNullable: false,
                  default: "uuid_generate_v4()",
                },
                {
                    name: "user_id",
                    type: "uuid",
                    isNullable: false,
                  },
                {
                  name: "product_id",
                  type: "uuid",
                  isNullable: false,
                  isUnique: false,
                },
                {
                    name: "quantity",
                    type: "varchar",
                    isNullable: false,
                    isUnique: false,
                  }
              ],
              foreignKeys: [
                new TableForeignKey({
                  name: "productid_cartitem_product",
                  referencedTableName: "product",
                  columnNames: ["product_id"],
                  referencedColumnNames: ["id"],
                }),
                new TableForeignKey({
                    name: "user_id_cartitem_user",
                    referencedTableName: "user",
                    columnNames: ["user_id"],
                    referencedColumnNames: ["id"],
                  })
              ]
            }),
          );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }
}
