import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SESSION } from '../../../../configs/typeorm.config';
import { PersonalAccessToken } from '../../../../database/entities/session/token.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonalAccessToken], SESSION),
    AuthModule,
  ],
  controllers: [SettingController],
})
export class SettingModule {}
