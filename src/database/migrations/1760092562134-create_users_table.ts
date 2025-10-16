import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ATTR_COLUMN_USER, ATTR_TABLE_USER } from '../entities/user.entity';

export class CreateUsersTable1760092562134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bigInt = process.env.DB_TYPE === 'sqlite' ? 'integer' : 'bigInt';
    await queryRunner.createTable(
      new Table({
        name: ATTR_TABLE_USER,
        columns: [
          {
            name: ATTR_COLUMN_USER.INT_ID,
            type: bigInt,
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
            isArray: false,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_USER.CHAR_USERNAME,
            type: 'varchar',
            length: '30',
            isUnique: true,
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_USER.CHAR_FIRSTNAME,
            type: 'varchar',
            length: '30',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_USER.CHAR_LASTNAME,
            type: 'varchar',
            length: '30',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_USER.CHAR_TOKEN,
            type: 'varchar',
            length: '225',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_USER.CHAR_EMAIL,
            type: 'varchar',
            length: '125',
            isUnique: true,
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_USER.CHAR_PASSWORD,
            type: 'varchar',
            length: '225',
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_USER.INT_STATUS,
            type: 'mediumint',
            isNullable: false,
            unsigned: true,
            default: 1,
          },
          {
            name: ATTR_COLUMN_USER.INT_COUNT_WRONG_PASS,
            type: 'mediumint',
            isNullable: true,
            unsigned: true,
            default: null,
          },
          {
            name: ATTR_COLUMN_USER.CHAR_CONFIRMATION_CODE,
            type: 'varchar',
            length: '225',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_USER.INT_CREATED_BY,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_USER.INT_UPDATED_BY,
            type: bigInt,
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_USER.DATETIME_CREATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_USER.DATETIME_UPDATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_USER.DATETIME_DELETED,
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ATTR_TABLE_USER, true);
  }
}
