import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ATTR_COLUMN_USER, ATTR_TABLE_USER } from '../entities/user.entity';

export class AddFkUserTable1760327409740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.createForeignKey(
    //     ATTR_TABLE_USER,
    //     new TableForeignKey({
    //         columnNames: [ATTR_COLUMN_USER.ATTR_INT_CREATED_BY],
    //         referencedTableName: ATTR_TABLE_USER,
    //         referencedColumnNames: [ATTR_COLUMN_USER.ATTR_INT_ID],
    //         onDelete: 'CASCADE',
    //     }),
    // );
    // await queryRunner.createForeignKey(
    //     ATTR_TABLE_USER,
    //     new TableForeignKey({
    //         columnNames: [ATTR_COLUMN_USER.ATTR_INT_UPDATED_BY],
    //         referencedTableName: ATTR_TABLE_USER,
    //         referencedColumnNames: [ATTR_COLUMN_USER.ATTR_INT_ID],
    //         onDelete: 'CASCADE',
    //     }),
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
