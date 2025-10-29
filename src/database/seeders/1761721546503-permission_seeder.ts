import { MigrationInterface, QueryRunner } from 'typeorm';

import {
  ATTR_COLUMN_PERMISSION_SUB_GROUP,
  PermissionSubGroups,
} from '../entities/permissionSubGroup.entity';
import {
  ATTR_TABLE_PERMISSION,
  Permissions,
} from '../entities/permission.entity';

export class PermissionSeeder1761721546503 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .find(PermissionSubGroups, {
          order: {
            [ATTR_COLUMN_PERMISSION_SUB_GROUP.CHAR_CODE]: 'ASC',
          },
        })
        .then(async (result) => {
          const permissionArr: Partial<Record<string, any>[]> = [];

          for (const subGroupResult of result) {
            ['VIEW', 'CREATE', 'UPDATE', 'DELETE'].forEach(
              (codeSuffix, index) => {
                permissionArr.push({
                  object: `${subGroupResult[ATTR_COLUMN_PERMISSION_SUB_GROUP.CHAR_CODE]}.${index + 1}`,
                  description: `${subGroupResult[ATTR_COLUMN_PERMISSION_SUB_GROUP.CHAR_DESCRIPTION]} ${codeSuffix}`,
                  permission_group_id:
                    subGroupResult[ATTR_COLUMN_PERMISSION_SUB_GROUP.INT_GROUP],
                  permission_sub_group_id:
                    subGroupResult[ATTR_COLUMN_PERMISSION_SUB_GROUP.INT_ID],
                  created_by_id: 1,
                  updated_by_id: 1,
                });
              },
            );
          }

          await queryRunner.manager.insert(Permissions, permissionArr);
        });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM ${ATTR_TABLE_PERMISSION}`);
  }
}
