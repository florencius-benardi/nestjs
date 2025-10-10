import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ATTR_COLUMN_USER, ATTR_TABLE_USER } from '../entities/user.entity';

export class CreateUsersTable1760092562134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ATTR_TABLE_USER,
        columns: [
          {
            name: ATTR_COLUMN_USER.ATTR_INT_ID,
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
            isArray: false,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_CHAR_USERNAME,
            type: 'varchar',
            length: '30',
            isUnique: true,
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_CHAR_FIRSTNAME,
            type: 'varchar',
            length: '30',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_CHAR_LASTNAME,
            type: 'varchar',
            length: '30',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_CHAR_TOKEN,
            type: 'varchar',
            length: '225',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_CHAR_EMAIL,
            type: 'varchar',
            length: '125',
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_CHAR_PASSWORD,
            type: 'varchar',
            length: '225',
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_INT_STATUS,
            type: 'mediumint',
            isNullable: false,
            unsigned: true,
            default: 1,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_CHAR_CONFIRMATION_CODE,
            type: 'varchar',
            length: '225',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_INT_CREATED_BY,
            type: 'bigint',
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_INT_UPDATED_BY,
            type: 'bigint',
            isNullable: true,
            unsigned: true,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_DATETIME_CREATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_DATETIME_UPDATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_USER.ATTR_DATETIME_DELETED,
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ATTR_TABLE_USER);
  }
}
