import { Expose } from 'class-transformer';
import {
  IsString,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const object = args.object as ChangePasswordUser;
    return object.password === confirmPassword;
  }

  defaultMessage() {
    return 'Password confirmation does not match password';
  }
}

export class ChangePasswordUser {
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
