import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  ATTR_COLUMN_USER,
  ATTR_TABLE_USER,
  User,
} from '../entities/user.entity';

export class UserSeeder1760106337844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = queryRunner.manager.create(User, {
        [ATTR_COLUMN_USER.ATTR_CHAR_USERNAME]:
          'administrator'.toLocaleUpperCase(),
        [ATTR_COLUMN_USER.ATTR_CHAR_EMAIL]: 'admin@localhost.com',
        [ATTR_COLUMN_USER.ATTR_CHAR_FIRSTNAME]: 'administrator',
        [ATTR_COLUMN_USER.ATTR_INT_CREATED_BY]: 1,
        [ATTR_COLUMN_USER.ATTR_INT_UPDATED_BY]: 1,
      });

      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM ${ATTR_TABLE_USER} WHERE ${ATTR_COLUMN_USER.ATTR_CHAR_EMAIL} = 'admin@localhost.com'`,
    );
  }
}
