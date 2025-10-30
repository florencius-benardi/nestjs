import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '../../../../database/entities/role.entity';
import { RoleService } from '../../../domains/system/role/role.service';
import { AccessJWTStrategy } from '../../../../configs/auth/strategies/access.strategy';
import { MAIN, SESSION } from '../../../../configs/typeorm.config';
import { UserRoles } from '../../../../database/entities/userRole.entity';
import { Users } from '../../../../database/entities/user.entity';
import { PersonalAccessToken } from '../../../../database/entities/session/token.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRoles, Roles, Users], MAIN),
    TypeOrmModule.forFeature([PersonalAccessToken], SESSION),
    AuthModule,
  ],
  controllers: [RoleController],
  providers: [RoleService, AccessJWTStrategy],
})
export class RoleModule {}
