import { MigrationInterface, QueryRunner,Table } from "typeorm"

export class Users1686214062253 implements MigrationInterface {

    private readonly tableName="user"
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
                    name: "email",
                    type: "varchar",
                    isNullable: false,
                    isUnique:false
                  },
                {
                  name: "password",
                  type: "varchar",
                  isNullable: false,
                }
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
