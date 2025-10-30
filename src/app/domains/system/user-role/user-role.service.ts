import { Injectable } from '@nestjs/common';
import { BaseService } from '../../base.service';
import { UserRoles } from '../../../../database/entities/userRole.entity';
import { MAIN } from '../../../../configs/typeorm.config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRoleService extends BaseService {
  constructor(
    @InjectRepository(UserRoles, MAIN)
    private readonly repository: Repository<UserRoles>,
  ) {
    super();
  }

  async store(roleId: number, userId: number, userAuth: number): Promise<void> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    console.log(roleId, userId, userAuth);
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
}
