import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class LoginUser {
  @Expose({ name: 'email' })
  @IsNotEmpty({ message: 'Email / Username is required.' })
  email: string;

  @Expose({ name: 'password' })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
