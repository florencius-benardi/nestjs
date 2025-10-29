import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  ATTR_COLUMN_PERMISSION,
  ATTR_TABLE_PERMISSION,
} from '../entities/permission.entity';

export class CreatePermissionTable1761712680048 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bigInt = process.env.DB_TYPE === 'sqlite' ? 'integer' : 'bigInt';
    await queryRunner.createTable(
      new Table({
        name: ATTR_TABLE_PERMISSION,
        columns: [
          {
            name: ATTR_COLUMN_PERMISSION.INT_ID,
            type: bigInt,
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
            isArray: false,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION.CHAR_OBJECT,
            type: 'varchar',
            length: '15',
            isUnique: true,
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_PERMISSION.CHAR_DESCRIPTION,
            type: 'varchar',
            length: '30',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION.INT_GROUP,
            type: bigInt,
            isNullable: false,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION.INT_SUB_GROUP,
            type: bigInt,
            isNullable: false,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION.INT_CREATED_BY,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION.INT_UPDATED_BY,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION.DATETIME_CREATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION.DATETIME_UPDATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION.DATETIME_DELETED,
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        uniques: [
          {
            name: `UQ_${ATTR_TABLE_PERMISSION}_${ATTR_COLUMN_PERMISSION.CHAR_OBJECT}`,
            columnNames: [ATTR_COLUMN_PERMISSION.CHAR_OBJECT],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ATTR_TABLE_PERMISSION, true);
  }
}
