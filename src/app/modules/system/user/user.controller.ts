import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ReadUser, ReadUsers, StoreUser, UpdateUser } from './user.validator';
import { UserService } from '../../../domains/system/user/user.service';
import { buildPaginationResponse } from '../../../commons/utils/pagination.util';
import { buildResponse } from '../../../commons/utils/response.util';
import { decodedID } from '../../../commons/utils/hashId.util';

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
  async find(@Param() req: ReadUser) {
    const id = typeof req.user == 'number' ? req.user : decodedID(req.user);
    const result = await this.userService.read(id);
    return buildResponse(result, true, 'Fetch user success.');
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async store(@Body() request: StoreUser) {
    const result = await this.userService.store(request);
    return buildResponse(result, true, 'Create user success.');
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(@Param() req: ReadUser, @Body() request: UpdateUser) {
    const id = typeof req.user == 'number' ? req.user : decodedID(req.user);
    const result = await this.userService.update(id, request);
    return buildResponse(result, true, 'Update user success.');
  }
}
