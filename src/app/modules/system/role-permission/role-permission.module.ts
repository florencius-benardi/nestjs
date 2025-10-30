import { Module } from '@nestjs/common';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionService } from '../../../domains/system/role-permission/role-permission.service';
import { AccessJWTStrategy } from '../../../../configs/auth/strategies/access.strategy';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissions } from '../../../../database/entities/rolePermission.entity';
import { PersonalAccessToken } from '../../../../database/entities/session/token.entity';
import { MAIN, SESSION } from '../../../../configs/typeorm.config';
import { Users } from '../../../../database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolePermissions, Users], MAIN),
    TypeOrmModule.forFeature([PersonalAccessToken], SESSION),
    AuthModule,
  ],
  controllers: [RolePermissionController],
  providers: [RolePermissionService, AccessJWTStrategy],
})
export class RolePermissionModule {}
