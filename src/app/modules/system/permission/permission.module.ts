import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalAccessToken } from '../../../../database/entities/session/token.entity';
import { PermissionSubGroups } from '../../../../database/entities/permissionSubGroup.entity';
import { PermissionGroups } from '../../../../database/entities/permissionGroup.entity';
import { Permissions } from '../../../../database/entities/permission.entity';
import { MAIN, SESSION } from '../../../../configs/typeorm.config';
import { PermissionController } from './permission.controller';
import { PermissionService } from '../../../domains/system/permission/permission.service';
import { Users } from '../../../../database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Users, Permissions, PermissionGroups, PermissionSubGroups],
      MAIN,
    ),
    TypeOrmModule.forFeature([PersonalAccessToken], SESSION),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
