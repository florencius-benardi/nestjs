import { AuthController } from './auth.controller';
import { AuthService } from '../../../domains/system/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../../database/entities/user.entity';
import { readFileSync } from 'node:fs';
import { MAIN, SESSION } from '../../../../configs/typeorm.config';
import { PersonalAccessToken } from '../../../../database/entities/session/token.entity';
import { RefreshJWTStrategy } from '../../../../configs/auth/strategies/refresh.strategy';
import { PassportModule } from '@nestjs/passport';
import { Algorithm } from 'jsonwebtoken';
import 'dotenv/config';
import { AccessJWTStrategy } from '../../../../configs/auth/strategies/access.strategy';
import { UserRoles } from '../../../../database/entities/userRole.entity';
import { RolePermissions } from '../../../../database/entities/rolePermission.entity';
import { PermissionSubGroups } from '../../../../database/entities/permissionSubGroup.entity';
import { PermissionGroups } from '../../../../database/entities/permissionGroup.entity';
import { Permissions } from '../../../../database/entities/permission.entity';
import { Roles } from '../../../../database/entities/role.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature(
      [
        Users,
        Roles,
        UserRoles,
        RolePermissions,
        Permissions,
        PermissionGroups,
        PermissionSubGroups,
      ],
      MAIN,
    ),
    TypeOrmModule.forFeature([PersonalAccessToken], SESSION),
    PassportModule.registerAsync({
      useFactory: () => ({
        defaultStrategy: 'jwt',
        session: false,
      }),
    }),
    JwtModule.registerAsync({
      useFactory: () => {
        const algorithm = (process.env.JWT_ALGORITHM as Algorithm) || 'HS256';

        const privateKey =
          algorithm == 'RS256'
            ? readFileSync(process.env.JWT_PRIVATE_KEY_PATH, 'utf8')
            : 'privateKey';
        const publicKey =
          algorithm == 'RS256'
            ? readFileSync(process.env.JWT_PUBLIC_KEY_PATH, 'utf8')
            : 'publicKey';
        const secret = process.env.JWT_SECRET;

        return {
          secret,
          privateKey,
          publicKey,
          // secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
          //   switch (requestType) {
          //     case JwtSecretRequestType.SIGN:
          //       return privateKey;
          //     case JwtSecretRequestType.VERIFY:
          //       return publicKey;
          //     default:
          //       return secret;
          //   }
          // },
          signOptions: {
            algorithm,
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  providers: [AuthService, RefreshJWTStrategy, AccessJWTStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
