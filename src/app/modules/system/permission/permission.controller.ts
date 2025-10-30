import { Abilities } from '../../../commons/decorators/abilty.decorator';
import { buildResponse } from '../../../commons/utils/response.util';
import { Controller, Get, Header, Query } from '@nestjs/common';
import { PERMISSION_CONS } from '../../../commons/constants/permission.constant';
import { ReadPermissions } from './permission.validator';
import { PermissionService } from '../../../domains/system/permission/permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Abilities(PERMISSION_CONS.PERMISSION_VIEW)
  @Get()
  @Header('Content-Type', 'application/json')
  async findAll(@Query() query: ReadPermissions) {
    const result = await this.permissionService.reads(query);
    return buildResponse(result, true, 'Fetch permissions success.');
  }
}
