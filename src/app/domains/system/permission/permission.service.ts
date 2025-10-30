import { Injectable } from '@nestjs/common';
import { BaseService } from '../../base.service';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ATTR_COLUMN_PERMISSION_GROUP,
  PermissionGroups,
} from '../../../../database/entities/permissionGroup.entity';
import { MAIN } from '../../../../configs/typeorm.config';
import { Repository } from 'typeorm';
import { ReadPermissions } from '../../../modules/system/permission/permission.validator';

@Injectable()
export class PermissionService extends BaseService {
  constructor(
    @InjectRepository(PermissionGroups, MAIN)
    private readonly permissionGroupRepo: Repository<PermissionGroups>,
  ) {
    super();
  }

  async reads(query: ReadPermissions) {
    const { orderBy, sortOrder } = query;
    const order = this.orderQuery(sortOrder, orderBy, [
      ATTR_COLUMN_PERMISSION_GROUP.INT_ID,
      'DESC',
    ]);

    const result = await this.permissionGroupRepo.findAndCount({
      order,
      relations: {
        permission_sub_group: {
          permission: true,
        },
      },
      loadEagerRelations: true,
    });

    return { data: result[0], count: result[1] };
  }
}
