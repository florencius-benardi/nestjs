import {
  ExecutionContext,
  Injectable,
  CanActivate,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JWTUserInterface } from '../../../app/commons/interface/jwt.interface';

@Injectable()
export class AbilityJWTAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredAbilities = this.reflector.get<string[] | undefined>(
      'abilities',
      context.getHandler(),
    );

    if (!requiredAbilities || requiredAbilities.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user: JWTUserInterface = request.user;

    if (!user || !user.abilities) {
      throw new ForbiddenException({
        status: false,
        message: "Don't have any permission for this request.",
      });
    }

    let abilities: string[] = [];

    if (typeof user.abilities === 'string') {
      abilities = JSON.parse(user.abilities) as string[];
    } else if (Array.isArray(user.abilities)) {
      abilities = user.abilities;
    } else if (user.abilities && typeof user.abilities === 'object') {
      abilities = Object.values(user.abilities) as string[];
    }

    const authorize = requiredAbilities.some((a) => abilities.includes(a));

    if (!authorize) {
      throw new ForbiddenException({
        status: false,
        message: "Don't have any permission for this request.",
      });
    }

    return true;
  }
}
