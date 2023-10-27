import { MigrationInterface, QueryRunner,Table ,TableForeignKey} from "typeorm"

export class Order1686214773192 implements MigrationInterface {
    private readonly tableName="order"
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
                    name: "created_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                  },
                  {
                    name: "updated_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                  }
              ],
              foreignKeys: [
                new TableForeignKey({
                    name: "user_id_order_user",
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
