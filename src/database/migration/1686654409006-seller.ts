import { MigrationInterface, QueryRunner,Table } from "typeorm"

export class Seller1686654409006 implements MigrationInterface {
        private readonly tableName="seller"
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
                }),
              );
        }
    
    
public async down(queryRunner: QueryRunner): Promise<void> {    
            await queryRunner.dropTable(this.tableName);
        }

}
