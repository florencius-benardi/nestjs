import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { ReadUsers } from '../../../http/validators/systems/users/user.validator';
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
    const order = this.orderQuery(sortOrder, orderBy);
    const { take, skip } = this.limitOffset(length, start);
    return await this.userRepository.findAndCount({
      skip,
      take,
      order,
    });
  }
}
