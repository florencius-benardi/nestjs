import {
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class AccessJWTAuthGuard extends AuthGuard('jwt-access') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  getRequest(context: ExecutionContext): any {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    const token: string = this.extractTokenFromHeader(request);
    let payload = null;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      payload = this.jwtService.verify(token);
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException({
          message:
            err.message == 'jwt expired' ? 'Token was expired.' : err.message,
          status: false,
        });
      } else {
        throw new InternalServerErrorException({
          message: err.message,
          status: false,
        });
      }
    }

    if (!payload?.type)
      throw new UnauthorizedException({
        message: 'Invalid Token.',
      });

    return request;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
