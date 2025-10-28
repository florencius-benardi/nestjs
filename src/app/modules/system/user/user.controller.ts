import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReadUser, ReadUsers, StoreUser, UpdateUser } from './user.validator';
import { UserService } from '../../../domains/system/user/user.service';
import { buildPaginationResponse } from '../../../commons/utils/pagination.util';
import { buildResponse } from '../../../commons/utils/response.util';
import { decodedID } from '../../../commons/utils/hashId.util';
import { AccessJWTAuthGuard } from '../../../../configs/auth/guards/access.guard';
import { JWTUserInterface } from '../../../commons/interface/jwt.interface';
import { ATTR_COLUMN_USER } from '../../../../database/entities/user.entity';
import { Abilities } from '../../../commons/decorators/abilty.decorator';
import { AbilityJWTAuthGuard } from '../../../../configs/auth/guards/ability.guard';

@UseGuards(AccessJWTAuthGuard, AbilityJWTAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Abilities('user:view')
  @Get()
  @Header('Content-Type', 'application/json')
  async findAll(@Query() request: ReadUsers, @Req() req: any) {
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
  async find(@Param() params: ReadUser, @Req() req: any) {
    const id =
      typeof params.user == 'number' ? params.user : decodedID(params.user);
    const result = await this.userService.read(id);
    return buildResponse(result, true, 'Fetch user success.');
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async store(@Body() body: StoreUser, @Req() req: any) {
    const user: JWTUserInterface = req.user;

    const result = await this.userService.store(
      body,
      user.user[ATTR_COLUMN_USER.INT_ID],
    );
    return buildResponse(result, true, 'Create user success.');
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param() param: ReadUser,
    @Body() body: UpdateUser,
    @Req() req: any,
  ) {
    const user: JWTUserInterface = req.user;
    const id =
      typeof param.user == 'number' ? param.user : decodedID(param.user);
    const result = await this.userService.update(
      id,
      body,
      user.user[ATTR_COLUMN_USER.INT_ID],
    );
    return buildResponse(result, true, 'Update user success.');
  }
}
