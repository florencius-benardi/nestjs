import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { BaseDatatable } from '../../base/base.validator';
import {
  ATTR_COLUMN_USER,
  User,
} from '../../../../database/entities/user.entity';
import { isUnique } from '../../../commons/decorators/is-unique.decorator';
import { ChangePasswordUser } from '../../../commons/validators/match-password.constraint';
import { decodedID } from '../../../commons/utils/hashId.util';
import { isExist } from '../../../commons/decorators/is-exist.decorator';

export class ReadUsers extends BaseDatatable {
  @IsOptional()
  @IsString()
  status?: string;

  @Expose({ name: 'last_name' })
  @IsOptional()
  @IsString()
  lastName?: string;
}

export class ReadUser {
  @Expose({ name: 'id' })
  @Transform(({ value }: { value: string }): string | number | undefined =>
    decodedID(value),
  )
  @isExist(User, ATTR_COLUMN_USER.INT_ID, true, {
    message: 'The user does not exist.',
  })
  user: number | string;
}

export class StoreUser extends ChangePasswordUser {
  @Transform(({ value }): string | undefined =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @Expose({ name: 'username' })
  @isUnique(
    User,
    ATTR_COLUMN_USER.CHAR_USERNAME,
    ATTR_COLUMN_USER.INT_ID,
    'id',
    false,
    {
      message: 'Username already exist.',
    },
  )
  @MaxLength(15, {
    message: 'The username not be greater than $constraint1 character',
  })
  username: string;

  @Transform(({ value }): string | undefined =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @Expose({ name: 'email' })
  @isUnique(User, ATTR_COLUMN_USER.CHAR_USERNAME, undefined, undefined, false, {
    message: 'Email already exist.',
  })
  @IsEmail()
  email: string;

  @Expose({ name: 'first_name' })
  @IsString()
  @MaxLength(20, {
    message: 'The first name must not be greater than $constraint1 character',
  })
  firstName: string;

  @Expose({ name: 'last_name' })
  @IsOptional()
  @IsString()
  @MaxLength(20, {
    message: 'The last name must not be greater than $constraint1 character',
  })
  lastName?: string;
}

export class UpdateUser {
  @Expose({ name: 'id' })
  id: string | number;

  @Expose({ name: 'email' })
  @isUnique(
    User,
    ATTR_COLUMN_USER.CHAR_USERNAME,
    ATTR_COLUMN_USER.INT_ID,
    'id',
    false,
    {
      message: 'Email already exist.',
    },
  )
  @IsEmail()
  email: string;

  @Expose({ name: 'first_name' })
  @IsString()
  @MaxLength(20, {
    message: 'The first name must not be greater than $constraint1 character',
  })
  firstName: string;

  @Expose({ name: 'last_name' })
  @IsOptional()
  @IsString()
  @MaxLength(20, {
    message: 'The last name must not be greater than $constraint1 character',
  })
  lastName?: string;
}
