import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../configs/typeorm.config';
import { UserService } from '../domains/system/user/user.service';
import { UserController } from './controllers/system/user/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../database/entities/user.entity';
import { ValidationModule } from './validation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TypeOrmModule.forFeature([User]),
    ValidationModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
