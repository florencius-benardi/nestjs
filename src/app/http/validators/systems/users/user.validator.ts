import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { BaseDatatable } from '../../base.validator';
import {
  ATTR_COLUMN_USER,
  User,
} from '../../../../../database/entities/user.entity';
import { isUnique } from '../../base/is-unique.decorator';

@ValidatorConstraint({ async: true })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const object = args.object as StoreUser;
    return object.password === confirmPassword;
  }

  defaultMessage() {
    return 'Password confirmation does not match password';
  }
}

export class ReadUsers extends BaseDatatable {
  @IsOptional()
  @IsString()
  status?: string;

  @Expose({ name: 'last_name' })
  @IsOptional()
  @IsString()
  lastName?: string;
}

export class StoreUser {
  @Expose({ name: 'username' })
  @isUnique(User, ATTR_COLUMN_USER.ATTR_CHAR_USERNAME, {
    message: 'Username already exist.',
  })
  @MaxLength(15, {
    message: 'The username not be greater than $constraint1 character',
  })
  username: string;

  @Expose({ name: 'email' })
  @isUnique(User, ATTR_COLUMN_USER.ATTR_CHAR_EMAIL, {
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

  @Expose({ name: 'password' })
  @IsString()
  @MinLength(8, {
    message:
      'Min. length of password must be equal than $constraint1 character',
  })
  password?: string;

  @Expose({ name: 'confirm_password' })
  @IsString()
  @Validate(MatchPasswordConstraint)
  confirmPassword: string;
}
