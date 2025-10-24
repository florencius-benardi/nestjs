import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  ATTR_COLUMN_TOKEN,
  ATTR_TABLE_TOKEN,
} from '../../entities/session/token.entity';

export class CreateTokenTable1760608272863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ATTR_TABLE_TOKEN,
        columns: [
          {
            name: ATTR_COLUMN_TOKEN.CHAR_ID,
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: ATTR_COLUMN_TOKEN.CHAR_NAME,
            type: 'varchar',
            length: '30',
            isUnique: true,
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_TOKEN.CHAR_TYPE,
            type: 'varchar',
            length: '30',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_TOKEN.CHAR_TOKEN,
            type: 'varchar',
            length: '225',
            isNullable: false,
          },
          {
            name: ATTR_COLUMN_TOKEN.JSON_ABILITIES,
            type: 'json',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_TOKEN.DATETIME_EXPIRES,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_TOKEN.DATETIME_CREATED,
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: ATTR_COLUMN_TOKEN.DATETIME_UPDATED,
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ATTR_TABLE_TOKEN, true);
  }
}
