import { MigrationInterface, QueryRunner,TableForeignKey} from "typeorm"

export class AddColumnGmailMessage1690284796099 implements MigrationInterface {

        private readonly tableName="order_item"
        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createForeignKey(
              this.tableName,
                    new TableForeignKey({
                        name: "dd",
                        referencedTableName: "order",
                        columnNames: ["column6"],
                        referencedColumnNames: ["id"],
                      }),
              );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
