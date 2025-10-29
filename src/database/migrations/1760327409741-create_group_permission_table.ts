import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  ATTR_COLUMN_PERMISSION_GROUP,
  ATTR_TABLE_PERMISSION_GROUP,
} from '../entities/permissionGroup.entity';

export class CreateGroupPermissionTable1761713218439
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bigInt = process.env.DB_TYPE === 'sqlite' ? 'integer' : 'bigInt';
    await queryRunner.createTable(
      new Table({
        name: ATTR_TABLE_PERMISSION_GROUP,
        columns: [
          {
            name: ATTR_COLUMN_PERMISSION_GROUP.INT_ID,
            type: bigInt,
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
            isArray: false,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION_GROUP.CHAR_CODE,
            type: 'varchar',
            length: '10',
            isUnique: true,
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_PERMISSION_GROUP.CHAR_DESCRIPTION,
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_PERMISSION_GROUP.INT_CREATED_BY,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION_GROUP.INT_UPDATED_BY,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION_GROUP.DATETIME_CREATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION_GROUP.DATETIME_UPDATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_PERMISSION_GROUP.DATETIME_DELETED,
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ATTR_TABLE_PERMISSION_GROUP, true);
  }
}
