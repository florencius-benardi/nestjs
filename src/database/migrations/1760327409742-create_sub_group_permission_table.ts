import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  ATTR_COLUMN_PERMISSION_SUB_GROUP,
  ATTR_TABLE_PERMISSION_SUB_GROUP,
} from '../entities/permissionSubGroup.entity';

export class CreateSubGroupPermissionTable1761713258472
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bigInt = process.env.DB_TYPE === 'sqlite' ? 'integer' : 'bigInt';
    await queryRunner.createTable(
      new Table({
        name: ATTR_TABLE_PERMISSION_SUB_GROUP,
        columns: [
          {
            name: ATTR_COLUMN_PERMISSION_SUB_GROUP.INT_ID,
            type: bigInt,
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
            isArray: false,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION_SUB_GROUP.CHAR_CODE,
            type: 'varchar',
            length: '10',
            isUnique: true,
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_PERMISSION_SUB_GROUP.CHAR_DESCRIPTION,
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_PERMISSION_SUB_GROUP.INT_GROUP,
            type: bigInt,
            isNullable: false,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION_SUB_GROUP.INT_CREATED_BY,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION_SUB_GROUP.INT_UPDATED_BY,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION_SUB_GROUP.DATETIME_CREATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION_SUB_GROUP.DATETIME_UPDATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION_SUB_GROUP.DATETIME_DELETED,
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        uniques: [
          {
            name: `UQ_PERMISSION_SUB_GROUP`,
            columnNames: [
              ATTR_COLUMN_PERMISSION_SUB_GROUP.CHAR_CODE,
              ATTR_COLUMN_PERMISSION_SUB_GROUP.INT_GROUP,
            ],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ATTR_TABLE_PERMISSION_SUB_GROUP, true);
  }
}
