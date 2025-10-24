import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MAIN,
  SESSION,
  typeOrmConfig,
  typeOrmSessionConfig,
} from './configs/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './app/modules/system/user/user.module';
import { ValidationModule } from './app/modules/base/base.module';
import { AuthModule } from './app/modules/system/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RoleService } from './app/modules/system/role/role.service';
import { PermissionService } from './app/modules/system/permission/permission.service';
import { UserRoleService } from './app/modules/system/user-role/user-role.service';
import { RolePermissionService } from './app/modules/system/role-permission/role-permission.service';

@Module({
  imports: [
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 6000,
          limit: 10,
        },
      ],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      name: MAIN,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TypeOrmModule.forRootAsync({
      name: SESSION,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmSessionConfig,
    }),
    ValidationModule,
    UserModule,
  ],
  providers: [
    RoleService,
    PermissionService,
    UserRoleService,
    RolePermissionService,
  ],
})
export class AppModule {}
