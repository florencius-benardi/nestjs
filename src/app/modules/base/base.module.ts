import { Injectable, Module, Scope, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../database/entities/user.entity';
import { IsExistConstraint } from '../../commons/validators/is-exist.constraint';
import { IsUniqueConstraint } from '../../commons/validators/is-unique.constraint';
import { APP_PIPE } from '@nestjs/core';

// @Injectable({ scope: Scope.REQUEST })
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [IsUniqueConstraint, IsExistConstraint],
  exports: [IsUniqueConstraint, IsExistConstraint],
})
export class ValidationModule {}
