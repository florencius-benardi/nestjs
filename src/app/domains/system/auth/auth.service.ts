import crypto from 'node:crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseService } from '../../base.service';
import { Repository } from 'typeorm';
import {
  ATTR_COLUMN_USER,
  Users,
} from '../../../../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from '../../../commons/utils/validate.util';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { MAIN, SESSION } from '../../../../configs/typeorm.config';
import {
  ATTR_COLUMN_TOKEN,
  PersonalAccessToken,
} from '../../../../database/entities/session/token.entity';
import { LoginUser } from '../../../modules/system/auth/auth.validator';
import { addNowDayEndOfDay } from '../../../commons/utils/manipulate.util';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    @InjectRepository(Users, MAIN)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(PersonalAccessToken, SESSION)
    private readonly tokenRepository: Repository<PersonalAccessToken>,
    private readonly jwtService: JwtService,
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
      .then(async (result): Promise<Users> => {
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

    const queryRunner =
      this.tokenRepository.manager.connection.createQueryRunner();

    const tokenText = crypto.randomBytes(32).toString('hex');

    const createdDay = addNowDayEndOfDay().toString();
    const token = queryRunner.manager.create(PersonalAccessToken, {
      token: tokenText,
      grant_to_id: result.id,
      name: 'user-token',
      type: '1',
      expires_at: createdDay,
    });

    await queryRunner.manager.save(token);

    const refreshToken = await this.jwtService.signAsync(
      {
        token: token[ATTR_COLUMN_TOKEN.CHAR_TOKEN],
        uuid: token[ATTR_COLUMN_TOKEN.CHAR_ID],
        user: token[ATTR_COLUMN_TOKEN.INT_USER],
      },
      { expiresIn: '30d' },
    );

    const accessToken = await this.jwtService.signAsync(
      {
        token: token[ATTR_COLUMN_TOKEN.CHAR_TOKEN],
        user: token[ATTR_COLUMN_TOKEN.INT_USER],
      },
      { expiresIn: '1h' },
    );

    return {
      refresh_token: refreshToken,
      access_token: accessToken,
      create_at: createdDay,
    };
  }
}
