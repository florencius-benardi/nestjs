import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  ATTR_COLUMN_USER,
  Users,
} from '../../../database/entities/user.entity';
import { MAIN, SESSION } from '../../typeorm.config';
import { Repository } from 'typeorm';
import {
  ATTR_COLUMN_TOKEN,
  PersonalAccessToken,
} from '../../../database/entities/session/token.entity';
import { JWTUserInterface } from '../../../app/commons/interface/jwt.interface';

interface JWTInterfance {
  token: string;
  user: number;
  type: string | number;
}

@Injectable()
export class AccessJWTStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    @InjectRepository(Users, MAIN)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(PersonalAccessToken, SESSION)
    private readonly tokenRepository: Repository<PersonalAccessToken>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JWTInterfance): Promise<JWTUserInterface> {
    const tokenResult = await this.tokenRepository.findOne({
      where: {
        [ATTR_COLUMN_TOKEN.CHAR_TOKEN]: payload.token,
        [ATTR_COLUMN_TOKEN.INT_USER]: payload.user,
        [ATTR_COLUMN_TOKEN.CHAR_TYPE]: payload.type.toString(),
      },
      select: [
        ATTR_COLUMN_TOKEN.CHAR_ID,
        ATTR_COLUMN_TOKEN.CHAR_TOKEN,
        ATTR_COLUMN_TOKEN.JSON_ABILITIES,
        ATTR_COLUMN_TOKEN.INT_USER,
        ATTR_COLUMN_TOKEN.CHAR_TYPE,
      ],
    });

    const userResult = await this.userRepository.findOne({
      where: {
        [ATTR_COLUMN_USER.INT_ID]: payload.user,
      },
    });

    if (!tokenResult)
      throw new UnauthorizedException({
        status: false,
        message: 'Invalid token.',
      });

    return {
      abilities: tokenResult[ATTR_COLUMN_TOKEN.JSON_ABILITIES],
      user: userResult,
      uuid: tokenResult[ATTR_COLUMN_TOKEN.CHAR_ID],
    };
  }
}
