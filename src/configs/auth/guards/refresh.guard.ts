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
export class RefreshJWTAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  getRequest(context: ExecutionContext): any {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    const token: string = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    let payload = null;
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

    if (!payload?.token)
      throw new UnauthorizedException({
        message: 'Invalid Token.',
      });

    return request;
  }

  handleRequest(err: any, user: any, info: any) {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException({
        status: false,
        message: 'Token Expired.',
      });
    }

    if (info && info?.message === 'No auth token') {
      throw new UnauthorizedException({
        status: false,
        message: 'Token Missing.',
      });
    }

    if (err || !user) {
      throw new UnauthorizedException({
        status: false,
        message: info?.message,
      });
    }

    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
