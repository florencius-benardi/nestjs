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
      const userData: Partial<User> = {
        userName: 'ADMIN',
        email: 'admin@localhost.com',
        firstName: 'administrator',
        password: 'administrator',
        status: 1,
        createdById: 1,
        updatedById: 1,
      };

      await queryRunner.manager.insert(User, [userData]);

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
