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
  ATTR_TYPE_TOKEN,
  PersonalAccessToken,
} from '../../../../database/entities/session/token.entity';
import { LoginUser } from '../../../modules/system/auth/auth.validator';
import {
  addNowDay,
  addNowDayEndOfDay,
  pluck,
} from '../../../commons/utils/manipulate.util';
import dayjs from 'dayjs';
import {
  ATTR_COLUMN_USER_ROLE,
  UserRoles,
} from '../../../../database/entities/userRole.entity';
import { ATTR_COLUMN_PERMISSION } from '../../../../database/entities/permission.entity';
import { ATTR_COLUMN_ROLE } from '../../../../database/entities/role.entity';
import { ATTR_COLUMN_ROLE_PERMISSION } from '../../../../database/entities/rolePermission.entity';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users, MAIN)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(UserRoles, MAIN)
    private readonly userRoleRepository: Repository<UserRoles>,
    @InjectRepository(PersonalAccessToken, SESSION)
    private readonly tokenRepository: Repository<PersonalAccessToken>,
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
        relations: {
          user_roles: {
            role: {
              role_permissions: {
                permission: true,
              },
            },
          },
          created_by: true,
        },
        select: {
          id: true,
          status: true,
          password: true,
          wrong_pass: true,
          user_roles: {
            id: true,
            user_id: true,
            role_id: true,
          },
        },
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

    const objectPermissions = result?.[ATTR_COLUMN_USER.RELATION_USER_ROLES]
      ?.flatMap(
        (ur) =>
          ur[ATTR_COLUMN_USER_ROLE.RELATION_ROLE]?.[
            ATTR_COLUMN_ROLE.RELATION_ROLE_PERMISSIONS
          ] ?? [],
      )
      .map(
        (rp) =>
          rp[ATTR_COLUMN_ROLE_PERMISSION.RELATION_PERMISSION]?.[
            ATTR_COLUMN_PERMISSION.CHAR_OBJECT
          ],
      )
      .filter(Boolean);
    const queryRunner =
      this.tokenRepository.manager.connection.createQueryRunner();

    const tokenText = crypto.randomBytes(32).toString('hex');

    const createdDay = dayjs().format();
    const expiresAt = addNowDayEndOfDay().toString();
    const token = queryRunner.manager.create(PersonalAccessToken, {
      token: tokenText,
      grant_to_id: result.id,
      name: 'user-token',
      type: ATTR_TYPE_TOKEN.USER.toString(),
      expires_at: expiresAt,
      abilities: objectPermissions as unknown as JSON,
    });

    await queryRunner.manager.save(token);

    const refreshToken = await this.jwtService.signAsync(
      {
        token: token[ATTR_COLUMN_TOKEN.CHAR_TOKEN],
        uuid: token[ATTR_COLUMN_TOKEN.CHAR_ID],
        user: token[ATTR_COLUMN_TOKEN.INT_USER],
      },
      {
        expiresIn: '30d',
      },
    );

    const accessToken = await this.jwtService.signAsync(
      {
        token: token[ATTR_COLUMN_TOKEN.CHAR_TOKEN],
        user: token[ATTR_COLUMN_TOKEN.INT_USER],
        type: ATTR_TYPE_TOKEN.USER,
      },
      {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      },
    );

    return {
      refresh_token: refreshToken,
      access_token: accessToken,
      created_at: createdDay,
    };
  }

  async logout(uuid: string) {
    await this.tokenRepository
      .findOneBy({
        [ATTR_COLUMN_TOKEN.CHAR_ID]: uuid,
      })
      .then(async (result): Promise<void> => {
        if (result) await this.tokenRepository.remove(result);
      });
  }

  async refresh(token: string, user: number) {
    const accessToken = await this.jwtService.signAsync(
      {
        token: token,
        user: user,
        type: ATTR_TYPE_TOKEN.USER,
      },
      {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      },
    );
    const createdDay = dayjs().format();
    return {
      access_token: accessToken,
      created_at: createdDay,
    };
  }
}
