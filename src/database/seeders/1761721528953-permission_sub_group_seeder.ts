import { MigrationInterface, QueryRunner } from 'typeorm';

import { PermissionGroups } from '../entities/permissionGroup.entity';
import {
  ATTR_COLUMN_PERMISSION_SUB_GROUP,
  ATTR_TABLE_PERMISSION_SUB_GROUP,
  PermissionSubGroups,
} from '../entities/permissionSubGroup.entity';

export class PermissionSubGroupSeeder1761721528953
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const aGroup = await queryRunner.manager
        .findOne(PermissionGroups, {
          where: { code: 'A' },
        })
        .then(async (result) => {
          const systemArr: Partial<Record<string, any>[]> = [];

          [
            'WEB SETTING',
            'MAIL SETTING',
            'ORDER SETTING',
            'WAITING LIST SETTING',
            'RESERVATION SETTING',
            'USER MANAGEMENT',
            'ROLE MANAGEMENT',
            'PERMISSION',
          ].forEach((codeSuffix, index) => {
            systemArr.push({
              code: `A.${index + 1}`,
              description: `${codeSuffix}`,
              permission_group_id: result.id,
              created_by_id: 1,
              updated_by_id: 1,
            });
          });
          return systemArr;
        });
      await queryRunner.manager.insert(PermissionSubGroups, aGroup);

      await queryRunner.manager
        .findOne(PermissionGroups, {
          where: { code: 'B' },
        })
        .then(async (result) => {
          const systemArr: Partial<Record<string, any>[]> = [];
          ['ACTIVITY', 'LOGIN', 'PAYMENT', 'VOUCHER', 'MEMBERSHIP'].forEach(
            (codeSuffix, index) => {
              systemArr.push({
                code: `B.${index + 1}`,
                description: `${codeSuffix}`,
                permission_group_id: result.id,
                created_by_id: 1,
                updated_by_id: 1,
              });
            },
          );

          await queryRunner.manager.insert(PermissionSubGroups, systemArr);
        });

      await queryRunner.manager
        .findOne(PermissionGroups, {
          where: { code: 'C' },
        })
        .then(async (result) => {
          const systemArr: Partial<Record<string, any>[]> = [];
          [
            'BRAND',
            'CITY',
            'COUNTRY',
            'LOCATION GROUP',
            'AREA',
            'LOCATION',
            'MERCHANT',
            'SEAT TYPE',
            'TABLE',
            'MENU CATEGORY',
            'MENU',
          ].forEach((codeSuffix, index) => {
            systemArr.push({
              code: `C.${index++}`,
              description: `${codeSuffix}`,
              permission_group_id: result.id,
              created_by_id: 1,
              updated_by_id: 1,
            });
          });

          await queryRunner.manager.insert(PermissionSubGroups, systemArr);
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
    await queryRunner.query(`DELETE FROM ${ATTR_TABLE_PERMISSION_SUB_GROUP}`);
  }
}
