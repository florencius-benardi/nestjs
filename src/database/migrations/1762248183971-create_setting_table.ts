import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  ATTR_COLUMN_SETTING,
  ATTR_TABLE_SETTING,
} from '../entities/setting.entity';

export class CreateSettingTable1762248183971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bigInt = process.env.DB_TYPE === 'sqlite' ? 'integer' : 'bigInt';
    await queryRunner.createTable(
      new Table({
        name: ATTR_TABLE_SETTING,
        columns: [
          {
            name: ATTR_COLUMN_SETTING.INT_ID,
            type: bigInt,
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
            isArray: false,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_SETTING.CHAR_TYPE,
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_SETTING.CHAR_KEY,
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_SETTING.CHAR_COLUMN_TYPE,
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_SETTING.CHAR_NAME,
            type: 'varchar',
            length: '50',
            isUnique: false,
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_SETTING.CHAR_REFERENCE,
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_SETTING.JSON_OPTIONS,
            type: 'json',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_SETTING.CHAR_VALUE,
            type: 'longtext',
            isNullable: false,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_SETTING.INT_CREATED_BY,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_SETTING.INT_UPDATED_BY,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_SETTING.DATETIME_CREATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_SETTING.DATETIME_UPDATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_SETTING.DATETIME_DELETED,
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        uniques: [
          {
            name: `UQ_${ATTR_TABLE_SETTING}_${ATTR_COLUMN_SETTING.CHAR_KEY}_${ATTR_COLUMN_SETTING.CHAR_TYPE}`,
            columnNames: [
              ATTR_COLUMN_SETTING.CHAR_KEY,
              ATTR_COLUMN_SETTING.CHAR_TYPE,
            ],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ATTR_TABLE_SETTING, true);
  }
}
