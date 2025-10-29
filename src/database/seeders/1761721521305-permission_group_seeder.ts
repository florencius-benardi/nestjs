import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  ATTR_TABLE_PERMISSION_GROUP,
  PermissionGroups,
} from '../entities/permissionGroup.entity';

export class PermissionGroupSeeder1761721521305 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const arr: Partial<Record<string, any>[]> = [
        {
          code: 'A',
          description: 'SYSTEM',
          created_by_id: 1,
          updated_by_id: 1,
        },
        {
          code: 'B',
          description: 'LOG',
          created_by_id: 1,
          updated_by_id: 1,
        },
        {
          code: 'C',
          description: 'MASTER',
          created_by_id: 1,
          updated_by_id: 1,
        },
      ];

      await queryRunner.manager.insert(PermissionGroups, arr);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM ${ATTR_TABLE_PERMISSION_GROUP}`);
  }
}
