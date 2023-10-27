import { MigrationInterface, QueryRunner,Table,TableForeignKey } from "typeorm"

export class OrderItem1686214793549 implements MigrationInterface {

    private readonly tableName="order_item"
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
                    name: "order_id",
                    type: "uuid",
                    isNullable: false,
                  },
                  {
                    name: "cart_item_id",
                    type: "uuid",
                    isNullable: false,
                  }
              ],
              foreignKeys: [
                new TableForeignKey({
                    name: "order_id_orderitem_order",
                    referencedTableName: "order",
                    columnNames: ["order_id"],
                    referencedColumnNames: ["id"],
                  }),
                  new TableForeignKey({
                    name: "cart_item_id_orderitem_cartitem",
                    referencedTableName: "cart_item",
                    columnNames: ["cart_item_id"],
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
