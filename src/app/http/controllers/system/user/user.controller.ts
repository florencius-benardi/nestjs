import { Controller, Get, Query, Req } from '@nestjs/common';
import { ReadUsers } from '../../../validators/systems/users/user.validator';
import { UserService } from '../../../../domains/system/user/user.service';
import { buildPaginationResponse } from '../../../../commons/utils/pagination.util';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() request: ReadUsers) {
    const result = await this.userService.reads(request);
    return buildPaginationResponse(
      result[0],
      result[1],
      request.start,
      request.length,
      'Fetch user success',
    );
  }
}
