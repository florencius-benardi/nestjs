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
import { AccessJWTAuthGuard } from '../../../../configs/auth/guards/access.guard';
import { AbilityJWTAuthGuard } from '../../../../configs/auth/guards/ability.guard';
import { RoleService } from '../../../domains/system/role/role.service';
import { buildPaginationResponse } from '../../../commons/utils/pagination.util';
import { PERMISSION_CONS } from '../../../commons/constants/permission.constant';
import { JWTUserInterface } from '../../../commons/interface/jwt.interface';
import { ATTR_COLUMN_ROLE } from '../../../../database/entities/role.entity';
import { Abilities } from '../../../commons/decorators/abilty.decorator';
import { ReadRole, ReadRoles, StoreRole, UpdateRole } from './role.validator';
import { buildResponse } from '../../../commons/utils/response.util';
import { decodedID } from '../../../commons/utils/hashId.util';

const { ROLE_MANAGEMENT_VIEW, ROLE_MANAGEMENT_CREATE, ROLE_MANAGEMENT_UPDATE } =
  PERMISSION_CONS;

@UseGuards(AccessJWTAuthGuard, AbilityJWTAuthGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Abilities(ROLE_MANAGEMENT_VIEW)
  @Get()
  @Header('Content-Type', 'application/json')
  async findAll(@Query() query: ReadRoles) {
    const result = await this.service.reads(query);
    return buildPaginationResponse(
      result.data,
      result.count,
      query.start,
      query.length,
      'Fetch role success',
    );
  }

  @Abilities(ROLE_MANAGEMENT_VIEW)
  @Get(':id')
  @Header('Content-Type', 'application/json')
  async find(@Param() params: ReadRole) {
    const id =
      typeof params.role == 'number' ? params.role : decodedID(params.role);
    const result = await this.service.read(id);
    return buildResponse(result, true, 'Fetch role success.');
  }

  @Abilities(ROLE_MANAGEMENT_CREATE)
  @Post()
  @Header('Content-Type', 'application/json')
  async store(@Body() body: StoreRole, @Req() req: any) {
    const user: JWTUserInterface = req.user;

    const result = await this.service.store(
      body,
      user.user[ATTR_COLUMN_ROLE.INT_ID],
    );
    return buildResponse(result, true, 'Create role success.');
  }

  @Abilities(ROLE_MANAGEMENT_UPDATE)
  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param() param: ReadRole,
    @Body() body: UpdateRole,
    @Req() req: any,
  ) {
    const user: JWTUserInterface = req.user;
    const id =
      typeof param.role == 'number' ? param.role : decodedID(param.role);
    const result = await this.service.update(
      id,
      body,
      user.user[ATTR_COLUMN_ROLE.INT_ID],
    );
    return buildResponse(result, true, 'Update role success.');
  }
}
