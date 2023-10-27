import { MigrationInterface, QueryRunner,Table,TableForeignKey } from "typeorm"

export class Product1686214739715 implements MigrationInterface {

    private readonly tableName="product"
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
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                  isUnique: false,
                  },
                {
                  name: "price",
                  type: "varchar",
                  isNullable: false,
                  isUnique: false,
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: false,
                    isUnique: false,
                  }
              ],
            }),
          );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }
}
