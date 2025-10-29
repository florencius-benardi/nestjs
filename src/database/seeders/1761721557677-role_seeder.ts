import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  ATTR_COLUMN_ROLE,
  ATTR_TABLE_ROLE,
  Roles,
} from '../entities/role.entity';

export class RoleSeeder1761721557677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const roleData: Partial<Roles> = {
        description: 'SYSTEM ADMINISTRATOR',
        created_by_id: 1,
        updated_by_id: 1,
      };

      await queryRunner.manager.insert(Roles, [roleData]);

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
      `DELETE FROM ${ATTR_TABLE_ROLE} WHERE ${ATTR_COLUMN_ROLE.CHAR_DESCRIPTION} =  'SYSTEM ADMINISTRATOR'`,
    );
  }
}
