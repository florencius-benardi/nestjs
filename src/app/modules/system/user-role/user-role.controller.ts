import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PERMISSION_CONS } from '../../../commons/constants/permission.constant';
import { UserRoleService } from '../../../domains/system/user-role/user-role.service';
import { Abilities } from '../../../commons/decorators/abilty.decorator';
import { JWTUserInterface } from '../../../commons/interface/jwt.interface';
import { ReadUserRoles, StoreUserRole } from './user-role.validator';
import { ReadRole } from '../role/role.validator';
import { ATTR_COLUMN_USER } from '../../../../database/entities/user.entity';
import { buildResponse } from '../../../commons/utils/response.util';
import { ReadUser } from '../user/user.validator';
import { buildPaginationResponse } from '../../../commons/utils/pagination.util';
import { AccessJWTAuthGuard } from '../../../../configs/auth/guards/access.guard';
import { AbilityJWTAuthGuard } from '../../../../configs/auth/guards/ability.guard';

const { ROLE_MANAGEMENT_UPDATE } = PERMISSION_CONS;

@UseGuards(AccessJWTAuthGuard, AbilityJWTAuthGuard)
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  @Abilities(ROLE_MANAGEMENT_UPDATE)
  @Get(':id/role')
  @Header('Content-Type', 'application/json')
  async readByRole(@Param() param: ReadRole, @Query() query: ReadUserRoles) {
    console.log(param);
    console.log(query);
    const result = await this.service.reads(query, param.role as number);
    return buildPaginationResponse(
      result.data,
      result.count,
      query.start,
      query.length,
      'Fetch user roles success',
    );
  }

  @Abilities(ROLE_MANAGEMENT_UPDATE)
  @Get(':id/user')
  @Header('Content-Type', 'application/json')
  async readByUser(@Param() param: ReadUser, @Query() query: ReadUserRoles) {
    const result = await this.service.reads(
      query,
      undefined,
      param.user as number,
    );

    return buildPaginationResponse(
      result.data,
      result.count,
      query.start,
      query.length,
      'Fetch user roles success',
    );
  }

  @Abilities(ROLE_MANAGEMENT_UPDATE)
  @Post(':id/role')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async storeByRole(
    @Req() req: any,
    @Param() param: ReadRole,
    @Body() body: StoreUserRole,
  ) {
    const user: JWTUserInterface = req.user;
    await this.service.store(
      Number(param.role),
      Number(body.user),
      user.user[ATTR_COLUMN_USER.INT_ID],
    );

    return buildResponse(undefined, true, 'Update user role success.');
  }

  @Abilities(ROLE_MANAGEMENT_UPDATE)
  @Post(':id/user')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async storByUser(
    @Param() param: ReadUser,
    @Body() body: StoreUserRole,
    @Req() req: any,
  ) {
    const user: JWTUserInterface = req.user;
    await this.service.store(
      Number(param.user),
      Number(body.role),
      user.user[ATTR_COLUMN_USER.INT_ID],
    );

    return buildResponse(undefined, true, 'Update user role success.');
  }
}
