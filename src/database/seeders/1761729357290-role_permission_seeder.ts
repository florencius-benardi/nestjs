import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  ATTR_COLUMN_PERMISSION,
  Permissions,
} from '../entities/permission.entity';
import { Roles } from '../entities/role.entity';
import {
  ATTR_TABLE_ROLE_PERMISSION,
  RolePermissions,
} from '../entities/rolePermission.entity';

export class RolePermissionSeeder1761729357290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .find(Permissions, {
          order: {
            [ATTR_COLUMN_PERMISSION.CHAR_OBJECT]: 'ASC',
          },
        })
        .then(async (permissionResult) => {
          await queryRunner.manager
            .findOne(Roles, {
              where: { description: 'SYSTEM ADMINISTRATOR' },
            })
            .then(async (result) => {
              const rolePermissionArr: Partial<Record<string, any>[]> = [];
              for (const permission of permissionResult) {
                rolePermissionArr.push({
                  role_id: result.id,
                  permission_id: permission.id,
                  created_by_id: 1,
                  updated_by_id: 1,
                });
              }

              await queryRunner.manager.insert(
                RolePermissions,
                rolePermissionArr,
              );
            });

          await queryRunner.commitTransaction();
        });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM ${ATTR_TABLE_ROLE_PERMISSION}`);
  }
}
