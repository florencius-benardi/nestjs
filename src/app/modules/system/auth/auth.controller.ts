import { Body, Controller, Header, Post } from '@nestjs/common';
import { LoginUser } from './auth.validator';
import { buildResponse } from '../../../commons/utils/response.util';
import { AuthService } from '../../../domains/system/auth/auth.service';

@Controller('authentication')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @Header('Content-Type', 'application/json')
  async store(@Body() request: LoginUser) {
    await this.service.login(request);
    return buildResponse(request, true, 'Login success.');
  }
}
