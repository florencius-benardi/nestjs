import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseService } from '../../base.service';
import { Repository } from 'typeorm';
import {
  ATTR_COLUMN_USER,
  User,
} from '../../../../database/entities/user.entity';
import { LoginUser } from '../../../modules/system/auth/auth.validator';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from '../../../commons/utils/validate.util';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async login(data: LoginUser) {
    const result = await this.userRepository
      .findOne({
        where: {
          [isEmail(data.email)
            ? ATTR_COLUMN_USER.CHAR_EMAIL
            : ATTR_COLUMN_USER.CHAR_USERNAME]: data.email,
        },
        select: [
          ATTR_COLUMN_USER.INT_ID,
          ATTR_COLUMN_USER.INT_STATUS,
          ATTR_COLUMN_USER.CHAR_PASSWORD,
          ATTR_COLUMN_USER.INT_COUNT_WRONG_PASS,
        ],
      })
      .then(async (result): Promise<boolean | User> => {
        if (!result)
          throw new UnauthorizedException({
            status: false,
            message: 'Please input registered Email or Username.',
          });

        const samePass = await compare(
          data.password,
          result[ATTR_COLUMN_USER.CHAR_PASSWORD],
        );
        if (!samePass) {
          const counter = result[ATTR_COLUMN_USER.INT_COUNT_WRONG_PASS] ?? 0;
          await this.userRepository.update(
            { id: result[ATTR_COLUMN_USER.INT_ID] },
            {
              wrong_pass: counter + 1,
            },
          );

          throw new UnauthorizedException({
            status: false,
            message: 'Input the correct password.',
          });
        }
        return result;
      });

    // const results = await Promise.all([
    //   (): Promise<string> =>
    //     new Promise((resolve) => setTimeout(() => resolve('API 1 data'), 1000)),
    //   (): Promise<string> =>
    //     new Promise((resolve) => setTimeout(() => resolve('API 2 data'), 1000)),
    // ]);
    console.log(result);
  }
}
