import { Injectable } from '@nestjs/common';
import { BaseService } from '../../base.service';
import {
  ATTR_COLUMN_USER_ROLE,
  UserRoles,
} from '../../../../database/entities/userRole.entity';
import { MAIN } from '../../../../configs/typeorm.config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadUserRoles } from '../../../modules/system/user-role/user-role.validator';

@Injectable()
export class UserRoleService extends BaseService {
  constructor(
    @InjectRepository(UserRoles, MAIN)
    private readonly repository: Repository<UserRoles>,
  ) {
    super();
  }

  async reads(dto: ReadUserRoles, roleId?: number, userId?: number) {
    const { length, start, orderBy, sortOrder } = dto;
    const order = this.orderQuery(sortOrder, orderBy, [
      ATTR_COLUMN_USER_ROLE.DATETIME_UPDATED,
      'DESC',
    ]);

    let where = {};
    if (userId)
      where = {
        ...where,
        user_id: userId,
      };

    if (roleId)
      where = {
        ...where,
        role_id: roleId,
      };

    const { take, skip } = this.limitOffset(length, start);
    const result = await this.repository.findAndCount({
      where,
      skip,
      take,
      order,
      relations: [
        ATTR_COLUMN_USER_ROLE.RELATION_CREATED_BY,
        ATTR_COLUMN_USER_ROLE.RELATION_UPDATED_BY,
        ATTR_COLUMN_USER_ROLE.RELATION_USER,
        ATTR_COLUMN_USER_ROLE.RELATION_ROLE,
      ],
      select: {
        created_by: {
          id: true,
          first_name: true,
          last_name: true,
        },
        updated_by: {
          id: true,
          first_name: true,
          last_name: true,
        },
        role: {
          id: true,
          description: true,
        },
        user: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
      loadEagerRelations: true,
    });

    return { data: result[0], count: result[1] };
  }

  async store(roleId: number, userId: number, userAuth: number) {
    await this.repository
      .findAndCount({
        where: {
          user_id: userId,
          role_id: roleId,
        },
      })
      .then(async (result) => {
        if (!result) {
          const queryRunner =
            this.repository.manager.connection.createQueryRunner();
          await queryRunner.connect();
          await queryRunner.startTransaction();

          try {
            const userRole = queryRunner.manager.create(UserRoles, {
              user_id: userId,
              role_id: roleId,
              created_by_id: userAuth,
              updated_by_id: userAuth,
            });

            await queryRunner.manager.save(userRole);
            await queryRunner.commitTransaction();
          } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
          } finally {
            await queryRunner.release();
          }
        }
      })
      .catch((error) => {
        throw error;
      });
  }
}
