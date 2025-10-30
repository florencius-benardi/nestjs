import { Body, Controller, Header, Param, Post, Req } from '@nestjs/common';
import { PERMISSION_CONS } from '../../../commons/constants/permission.constant';
import { UserRoleService } from '../../../domains/system/user-role/user-role.service';
import { Abilities } from '../../../commons/decorators/abilty.decorator';
import { JWTUserInterface } from '../../../commons/interface/jwt.interface';
import { StoreUserRole } from './user-role.validator';
import { ReadRole } from '../role/role.validator';
import { ATTR_COLUMN_USER } from '../../../../database/entities/user.entity';
import { buildResponse } from '../../../commons/utils/response.util';
import { ReadUser } from '../user/user.validator';

const { ROLE_MANAGEMENT_UPDATE } = PERMISSION_CONS;

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  @Abilities(ROLE_MANAGEMENT_UPDATE)
  @Post(':id/role')
  @Header('Content-Type', 'application/json')
  async storeByRole(
    @Param() param: ReadRole,
    @Body() body: StoreUserRole,
    @Req() req: any,
  ) {
    const user: JWTUserInterface = req.user;
    await this.service.store(
      param.role as number,
      body.user as number,
      user.user[ATTR_COLUMN_USER.INT_ID],
    );
    return buildResponse(undefined, true, 'Update user role success.');
  }

  @Abilities(ROLE_MANAGEMENT_UPDATE)
  @Post(':id/user')
  @Header('Content-Type', 'application/json')
  async storByUser(
    @Param() param: ReadUser,
    @Body() body: StoreUserRole,
    @Req() req: any,
  ) {
    const user: JWTUserInterface = req.user;
    await this.service.store(
      param.user as number,
      body.role as number,
      user.user[ATTR_COLUMN_USER.INT_ID],
    );
    return buildResponse(undefined, true, 'Update user role success.');
  }
}
