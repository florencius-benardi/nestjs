import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissions } from '../../../../database/entities/rolePermission.entity';
import { Repository } from 'typeorm';
import { MAIN } from '../../../../configs/typeorm.config';
import { StoreRolePermission } from '../../../modules/system/role-permission/role-permission.validator';
import { BaseService } from '../../base.service';

@Injectable()
export class RolePermissionService extends BaseService {
  constructor(
    @InjectRepository(RolePermissions, MAIN)
    private readonly rolePermissionRepository: Repository<RolePermissions>,
  ) {
    super();
  }

  async store(
    roleId: number,
    data: StoreRolePermission,
    userId: number,
  ): Promise<void> {
    const queryRunner =
      this.rolePermissionRepository.manager.connection.createQueryRunner();

    const permissions: RolePermissions[] =
      (data?.permission?.map((id) => {
        return {
          role_id: roleId,
          permission_id: id as number,
          created_by_id: userId,
          updated_by_id: userId,
        };
      }) as RolePermissions[]) || [];

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.rolePermissionRepository.delete({ role_id: roleId });
      if (permissions.length > 0) {
        const user = queryRunner.manager.create(RolePermissions, permissions);
        await queryRunner.manager.save(user);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
