import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginUser } from './auth.validator';
import { buildResponse } from '../../../commons/utils/response.util';
import { AuthService } from '../../../domains/system/auth/auth.service';
import { RefreshJWTAuthGuard } from '../../../../configs/auth/guards/refresh.guard';
import { ATTR_COLUMN_USER } from '../../../../database/entities/user.entity';
import { JWTUserInterface } from '../../../commons/interface/jwt.interface';

@Controller('authentication')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Header('Content-Type', 'application/json')
  async login(@Body() request: LoginUser) {
    const result = await this.service.login(request);
    return buildResponse(result, true, 'Login success.');
  }

  @UseGuards(RefreshJWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @Header('Content-Type', 'application/json')
  async logut(@Req() request: any) {
    const user: JWTUserInterface = request.user;
    const result = await this.service.logout(user.uuid);
    return buildResponse(result, true, 'Logout success.');
  }

  @UseGuards(RefreshJWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @Header('Content-Type', 'application/json')
  async refresh(@Req() request: any) {
    const user: JWTUserInterface = request.user;
    const result = await this.service.refresh(
      user.token,
      user.user[ATTR_COLUMN_USER.INT_ID],
    );
    return buildResponse(result, true, 'Access Token sucessfully created.');
  }
}
