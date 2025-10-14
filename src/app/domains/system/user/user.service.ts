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
} from '../../../http/validators/systems/users/user.validator';
import { BaseService } from '../../base.service';
import { decodedID } from '../../../commons/utils/hashId.util';

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
      ATTR_COLUMN_USER.ATTR_DATETIME_UPDATED,
      'DESC',
    ]);
    const { take, skip } = this.limitOffset(length, start);
    const result = await this.userRepository.findAndCount({
      skip,
      take,
      order,
      relations: [
        this.snakeToCamel(ATTR_COLUMN_USER.ATTR_RELATION_CREATED_BY),
        this.snakeToCamel(ATTR_COLUMN_USER.ATTR_RELATION_UPDATED_BY),
      ],
      select: {
        [this.snakeToCamel(ATTR_COLUMN_USER.ATTR_RELATION_CREATED_BY)]: {
          id: true,
          firstName: true,
          lastName: true,
        },
        [this.snakeToCamel(ATTR_COLUMN_USER.ATTR_RELATION_UPDATED_BY)]: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      loadEagerRelations: true,
    });

    return { data: result[0], count: result[1] };
  }

  async read(id: string) {
    return await this.userRepository.findOne({
      where: { id: decodedID(id) },
      relations: [
        this.snakeToCamel(ATTR_COLUMN_USER.ATTR_RELATION_CREATED_BY),
        this.snakeToCamel(ATTR_COLUMN_USER.ATTR_RELATION_UPDATED_BY),
      ],
      select: {
        [this.snakeToCamel(ATTR_COLUMN_USER.ATTR_RELATION_CREATED_BY)]: {
          id: true,
          firstName: true,
          lastName: true,
        },
        [this.snakeToCamel(ATTR_COLUMN_USER.ATTR_RELATION_UPDATED_BY)]: {
          id: true,
          firstName: true,
          lastName: true,
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
        userName: data.username.toUpperCase(),
        firstName: data.username,
        lastName: data.username,
        email: data.email.toLowerCase(),
        password: hash,
      });
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
      return await this.userRepository.findOne({
        where: { id: user.id },
        relations: [
          this.snakeToCamel(ATTR_COLUMN_USER.ATTR_RELATION_CREATED_BY),
          this.snakeToCamel(ATTR_COLUMN_USER.ATTR_RELATION_UPDATED_BY),
        ],
        select: {
          [this.snakeToCamel(ATTR_COLUMN_USER.ATTR_RELATION_CREATED_BY)]: {
            id: true,
            firstName: true,
            lastName: true,
          },
          [this.snakeToCamel(ATTR_COLUMN_USER.ATTR_RELATION_UPDATED_BY)]: {
            id: true,
            firstName: true,
            lastName: true,
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
