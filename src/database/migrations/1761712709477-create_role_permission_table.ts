import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  ATTR_COLUMN_ROLE_PERMISSION,
  ATTR_TABLE_ROLE_PERMISSION,
} from '../entities/rolePermission.entity';

export class CreateRolePermissionTable1761712709477
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bigInt = process.env.DB_TYPE === 'sqlite' ? 'integer' : 'bigInt';
    await queryRunner.createTable(
      new Table({
        name: ATTR_TABLE_ROLE_PERMISSION,
        columns: [
          {
            name: ATTR_COLUMN_ROLE_PERMISSION.INT_ID,
            type: bigInt,
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
            isArray: false,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_ROLE_PERMISSION.INT_ROLE,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_ROLE_PERMISSION.INT_PERMISSION,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_ROLE_PERMISSION.INT_CREATED_BY,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_ROLE_PERMISSION.INT_UPDATED_BY,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_ROLE_PERMISSION.DATETIME_CREATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_ROLE_PERMISSION.DATETIME_UPDATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_ROLE_PERMISSION.DATETIME_DELETED,
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        uniques: [
          {
            name: 'UQ_ROLE_PERMISSION',
            columnNames: [
              ATTR_COLUMN_ROLE_PERMISSION.INT_ROLE,
              ATTR_COLUMN_ROLE_PERMISSION.INT_PERMISSION,
            ],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ATTR_TABLE_ROLE_PERMISSION, true);
  }
}
