import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ATTR_COLUMN_ROLE,
  Roles,
} from '../../../../database/entities/role.entity';
import { Repository } from 'typeorm';
import { MAIN } from '../../../../configs/typeorm.config';
import {
  ReadRoles,
  StoreRole,
  UpdateRole,
} from '../../../modules/system/role/role.validator';
import { BaseService } from '../../base.service';

@Injectable()
export class RoleService extends BaseService {
  constructor(
    @InjectRepository(Roles, MAIN)
    private readonly roleRepository: Repository<Roles>,
  ) {
    super();
  }

  async reads(dto: ReadRoles) {
    const { length, start, orderBy, sortOrder } = dto;
    const order = this.orderQuery(sortOrder, orderBy, [
      ATTR_COLUMN_ROLE.DATETIME_UPDATED,
      'DESC',
    ]);
    const { take, skip } = this.limitOffset(length, start);
    const result = await this.roleRepository.findAndCount({
      skip,
      take,
      order,
      relations: [
        ATTR_COLUMN_ROLE.RELATION_CREATED_BY,
        ATTR_COLUMN_ROLE.RELATION_UPDATED_BY,
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
      },
      loadEagerRelations: true,
    });

    return { data: result[0], count: result[1] };
  }

  async read(id: number) {
    return await this.roleRepository.findOne({
      where: { id },
      relations: {
        role_permissions: true,
        created_by: true,
        updated_by: true,
      },
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
        role_permissions: {
          id: true,
          role_id: true,
          permission_id: true,
        },
      },
    });
  }

  async store(data: StoreRole, userId: number) {
    const queryRunner =
      this.roleRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = queryRunner.manager.create(Roles, {
        description: data.description,
        created_by_id: userId,
      });
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
      return await this.roleRepository.findOne({
        where: { id: user.id },
        relations: [
          ATTR_COLUMN_ROLE.RELATION_CREATED_BY,
          ATTR_COLUMN_ROLE.RELATION_UPDATED_BY,
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
        },
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, data: UpdateRole, userId: number) {
    const queryRunner =
      this.roleRepository.manager.connection.createQueryRunner();
    console.log(data, id);
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.roleRepository.update(
        { id },
        {
          description: data.description,
          updated_by_id: userId,
        },
      );

      await queryRunner.commitTransaction();
      return await this.roleRepository.findOne({
        where: { id: id },
        relations: [
          ATTR_COLUMN_ROLE.RELATION_CREATED_BY,
          ATTR_COLUMN_ROLE.RELATION_UPDATED_BY,
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
        },
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
