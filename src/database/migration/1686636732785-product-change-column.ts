import { number } from "@hapi/joi";
import { MigrationInterface, QueryRunner,TableColumn } from "typeorm"

export class ProductChangeColumn1686636732785 implements MigrationInterface {
    private readonly tableName="product";
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(this.tableName,'price');
        await queryRunner.addColumn(this.tableName,
                new TableColumn({
                    name: "price",
                    type: "numeric"
                    })  
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(this.tableName,'price');
        await queryRunner.addColumn(this.tableName,
            new TableColumn({
                name: "price",
                type: "varchar",
                isNullable: false,
                isUnique: false,
                })
        )  
        
    }

}
