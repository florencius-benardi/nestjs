import bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ATTR_COLUMN_USER,
  User,
} from '../../../../database/entities/user.entity';
import { Repository } from 'typeorm';
import {
  ReadUsers,
  StoreUser,
  UpdateUser,
} from '../../../modules/system/user/user.validator';
import { BaseService } from '../../base.service';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async reads(dto: ReadUsers) {
    const { length, start, orderBy, sortOrder } = dto;
    const order = this.orderQuery(sortOrder, orderBy, [
      ATTR_COLUMN_USER.DATETIME_UPDATED,
      'DESC',
    ]);
    const { take, skip } = this.limitOffset(length, start);
    const result = await this.userRepository.findAndCount({
      skip,
      take,
      order,
      relations: [
        ATTR_COLUMN_USER.RELATION_CREATED_BY,
        ATTR_COLUMN_USER.RELATION_UPDATED_BY,
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
    return await this.userRepository.findOne({
      where: { id },
      relations: [
        ATTR_COLUMN_USER.RELATION_CREATED_BY,
        ATTR_COLUMN_USER.RELATION_UPDATED_BY,
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
  }

  async store(data: StoreUser) {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const hash = bcrypt.hashSync(data.password, 12);
      const user = queryRunner.manager.create(User, {
        username: data.username.toUpperCase(),
        first_name: data.firstName?.toUpperCase(),
        last_name: data.lastName?.toUpperCase(),
        email: data.email.toLowerCase(),
        password: hash,
      });
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
      return await this.userRepository.findOne({
        where: { id: user.id },
        relations: [
          ATTR_COLUMN_USER.RELATION_CREATED_BY,
          ATTR_COLUMN_USER.RELATION_UPDATED_BY,
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

  async update(id: number, data: UpdateUser) {
    const userData = await this.userRepository.findOne({
      where: { id },
    });

    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = queryRunner.manager.create(User, {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email.toLowerCase(),
      });
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
      return await this.userRepository.findOne({
        where: { id: user.id },
        relations: [
          ATTR_COLUMN_USER.RELATION_CREATED_BY,
          ATTR_COLUMN_USER.RELATION_UPDATED_BY,
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
