import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../../../domains/system/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../../database/entities/user.entity';
import { MAIN, SESSION } from '../../../../configs/typeorm.config';
import { AccessJWTStrategy } from '../../../../configs/auth/strategies/access.strategy';
import { PersonalAccessToken } from '../../../../database/entities/session/token.entity';
import { AuthModule } from '../auth/auth.module';
import { Roles } from '../../../../database/entities/role.entity';
import { UserRoles } from '../../../../database/entities/userRole.entity';
import { RolePermissions } from '../../../../database/entities/rolePermission.entity';
import { Permissions } from '../../../../database/entities/permission.entity';
import { PermissionGroups } from '../../../../database/entities/permissionGroup.entity';
import { PermissionSubGroups } from '../../../../database/entities/permissionSubGroup.entity';

@Module({
  imports: [
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
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, AccessJWTStrategy],
})
export class UserModule {}
