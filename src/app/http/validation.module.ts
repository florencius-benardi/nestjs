import { Module } from '@nestjs/common';
import { IsUniqueConstraint } from './validators/base/is-unique.constraint';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { IsExistConstraint } from './validators/base/is-exist.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [IsUniqueConstraint, IsExistConstraint],
  exports: [IsUniqueConstraint, IsExistConstraint],
})
export class ValidationModule {}
