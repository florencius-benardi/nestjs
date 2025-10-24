import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginUser } from './auth.validator';
import { buildResponse } from '../../../commons/utils/response.util';
import { AuthService } from '../../../domains/system/auth/auth.service';
import { JWTAuthGuard } from '../../../../configs/auth/guards/jwt.guard';

@Controller('authentication')
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Header('Content-Type', 'application/json')
  async login(@Body() request: LoginUser) {
    const result = await this.service.login(request);
    return buildResponse(result, true, 'Login success.');
  }

  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @Header('Content-Type', 'application/json')
  async logut(@Body()) {
    const result = await this.service.login(request);
    return buildResponse(result, true, 'Logout success.');
  }
}
