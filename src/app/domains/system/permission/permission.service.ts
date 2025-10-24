import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base.service';
import { MAIN } from '../../../../configs/typeorm.config';
import {
  ATTR_COLUMN_PERMISSION,
  Permissions,
} from '../../../../database/entities/permission.entity';
import { ReadPermissions } from '../../../modules/system/permission/permission.validator';

@Injectable()
export class PermissionService extends BaseService {
  constructor(
    @InjectRepository(Permissions, MAIN)
    private readonly permissionRepository: Repository<Permissions>,
  ) {
    super();
  }

  async reads(dto: ReadPermissions) {
    const { length, start, orderBy, sortOrder } = dto;
    const order = this.orderQuery(sortOrder, orderBy, [
      ATTR_COLUMN_PERMISSION.DATETIME_UPDATED,
      'DESC',
    ]);
    const { take, skip } = this.limitOffset(length, start);
    const result = await this.permissionRepository.findAndCount({
      skip,
      take,
      order,
      loadEagerRelations: true,
    });

    return { data: result[0], count: result[1] };
  }
}
