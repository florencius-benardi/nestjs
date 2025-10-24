import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from '../database/entities/user.entity';

type DBType =
  | 'mysql'
  | 'mariadb'
  | 'postgres'
  | 'sqlite'
  | 'mongodb'
  | 'cockroachdb'
  | 'mssql'
  | 'oracle'
  | 'spanner';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});

export const MAIN = 'main';
export const SESSION = 'session';
export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  name: MAIN,
  type: configService.get<DBType>('DB_TYPE'),
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  database: configService.get<string>('DB_NAME'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  entities: [Users],
  autoLoadEntities: true,
  logging: configService.get<string>('NODE_ENV').toLowerCase() !== 'production',
  synchronize:
    configService.get<string>('NODE_ENV').toLowerCase() !== 'production',
});

export const typeOrmSessionConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: configService.get<DBType>('DB_SESSION_TYPE'),
  host: configService.get<string>('DB_SESSION_HOST'),
  port: configService.get<number>('DB_SESSION_PORT'),
  database: configService.get<string>('DB_SESSION_NAME'),
  username: configService.get<string>('DB_SESSION_USER'),
  password: configService.get<string>('DB_SESSION_PASS'),
  autoLoadEntities: true,
  logging: configService.get<string>('NODE_ENV').toLowerCase() !== 'production',
  synchronize:
    configService.get<string>('NODE_ENV').toLowerCase() !== 'production',
});
