import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ReadUsers,
  StoreUser,
} from '../../../validators/systems/users/user.validator';
import { UserService } from '../../../../domains/system/user/user.service';
import { buildPaginationResponse } from '../../../../commons/utils/pagination.util';
import { buildResponse } from '../../../../commons/utils/response.util';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAll(@Query() request: ReadUsers) {
    const result = await this.userService.reads(request);
    return buildPaginationResponse(
      result.data,
      result.count,
      request.start,
      request.length,
      'Fetch user success',
    );
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async find(@Param('id') id: string) {
    const result = await this.userService.read(id);
    return buildResponse(result, true, 'Fetch user success.');
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async store(@Body() request: StoreUser) {
    const result = await this.userService.store(request);
    return buildResponse(result, true, 'Create user success.');
  }
}
