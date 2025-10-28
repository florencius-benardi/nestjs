import { Users } from '../../../database/entities/user.entity';

export interface JWTUserInterface {
  uuid: string;
  abilities: JSON | undefined;
  user: Users;
  token?: string;
}
