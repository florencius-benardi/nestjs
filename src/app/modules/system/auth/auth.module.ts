import { AuthController } from './auth.controller';
import { AuthService } from '../../../domains/system/auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../../database/entities/user.entity';
import { readFileSync } from 'node:fs';
import { MAIN, SESSION } from '../../../../configs/typeorm.config';
import { PersonalAccessToken } from '../../../../database/entities/session/token.entity';
import { JWTStrategy } from '../../../../configs/auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users], MAIN),
    TypeOrmModule.forFeature([PersonalAccessToken], SESSION),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const algorithm =
          config.get<'HS256' | 'RS256'>('JWT_ALGORITHM') || 'HS256';

        const privateKey =
          algorithm == 'RS256'
            ? readFileSync(config.get<string>('JWT_PRIVATE_KEY_PATH'), 'utf8')
            : 'privateKey';
        const publicKey =
          algorithm == 'RS256'
            ? readFileSync(config.get<string>('JWT_PUBLIC_KEY_PATH'), 'utf8')
            : 'publicKey';
        const secret = config.get<string>('HASHIDS_SALT');

        return {
          secret,
          privateKey,
          publicKey,
          secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
            switch (requestType) {
              case JwtSecretRequestType.SIGN:
                return privateKey;
              case JwtSecretRequestType.VERIFY:
                return publicKey;
              default:
                return secret;
            }
          },
          signOptions: {
            algorithm,
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  providers: [AuthService, JWTStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
