import {
  Body,
  Controller,
  Header,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessJWTAuthGuard } from '../../../../configs/auth/guards/access.guard';
import { AbilityJWTAuthGuard } from '../../../../configs/auth/guards/ability.guard';
import { RolePermissionService } from '../../../domains/system/role-permission/role-permission.service';
import { PERMISSION_CONS } from '../../../commons/constants/permission.constant';
import { Abilities } from '../../../commons/decorators/abilty.decorator';
import { JWTUserInterface } from '../../../commons/interface/jwt.interface';
import { ReadRole } from '../role/role.validator';
import { StoreRolePermission } from './role-permission.validator';
import { ATTR_COLUMN_USER } from '../../../../database/entities/user.entity';
import { buildResponse } from '../../../commons/utils/response.util';

const { ROLE_MANAGEMENT_UPDATE } = PERMISSION_CONS;

@UseGuards(AccessJWTAuthGuard, AbilityJWTAuthGuard)
@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly service: RolePermissionService) {}

  @Abilities(ROLE_MANAGEMENT_UPDATE)
  @Post(':id')
  @Header('Content-Type', 'application/json')
  async store(
    @Param() param: ReadRole,
    @Body() body: StoreRolePermission,
    @Req() req: any,
  ) {
    const user: JWTUserInterface = req.user;
    await this.service.store(
      param.role as number,
      body,
      user.user[ATTR_COLUMN_USER.INT_ID],
    );
    return buildResponse(undefined, true, 'Update role success.');
  }
}
