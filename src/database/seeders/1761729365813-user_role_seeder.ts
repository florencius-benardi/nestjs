import { MigrationInterface, QueryRunner } from 'typeorm';
import { ATTR_COLUMN_ROLE, Roles } from '../entities/role.entity';
import { Users } from '../entities/user.entity';
import { ATTR_TABLE_USER_ROLE, UserRoles } from '../entities/userRole.entity';

export class UserRoleSeeder1761729365813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .find(Roles, {
          order: {
            [ATTR_COLUMN_ROLE.INT_ID]: 'ASC',
          },
        })
        .then(async (rolesResult) => {
          await queryRunner.manager
            .findOne(Users, {
              where: { id: 1 },
            })
            .then(async (result) => {
              const userRoleArr: Partial<Record<string, any>[]> = [];
              for (const role of rolesResult) {
                userRoleArr.push({
                  role_id: role.id,
                  user_id: result.id,
                  created_by_id: 1,
                  updated_by_id: 1,
                });
              }

              await queryRunner.manager.insert(UserRoles, userRoleArr);
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
    await queryRunner.query(`DELETE FROM ${ATTR_TABLE_USER_ROLE}`);
  }
}
