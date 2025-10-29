import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { encodedID } from '../../app/commons/utils/hashId.util';
import { Expose } from 'class-transformer';

export const ATTR_TABLE_PERMISSION_GROUP = 'permission_groups';
export const ATTR_COLUMN_PERMISSION_GROUP = {
  CHAR_CODE: 'code',
  CHAR_DESCRIPTION: 'description',
  INT_ID: 'id',
  INT_CREATED_BY: 'created_by_id',
  INT_UPDATED_BY: 'updated_by_id',
  DATETIME_CREATED: 'created_at',
  DATETIME_UPDATED: 'updated_at',
  DATETIME_DELETED: 'deleted_at',
  CHAR_ENCRYPTION: 'encryption_id',
} as const;

@Entity({ name: ATTR_TABLE_PERMISSION_GROUP })
export class PermissionGroups {
  @Expose({ name: ATTR_COLUMN_PERMISSION_GROUP.INT_ID })
  @PrimaryGeneratedColumn({
    name: ATTR_COLUMN_PERMISSION_GROUP.INT_ID,
    type: process.env.DB_TYPE === 'postgres' ? 'bigint' : 'int',
    unsigned: true,
  })
  [ATTR_COLUMN_PERMISSION_GROUP.INT_ID]: number;

  @Expose({ name: ATTR_COLUMN_PERMISSION_GROUP.CHAR_CODE })
  @Column({
    name: ATTR_COLUMN_PERMISSION_GROUP.CHAR_CODE,
    length: 10,
    update: false,
    unique: true,
  })
  [ATTR_COLUMN_PERMISSION_GROUP.CHAR_CODE]: string;

  @Expose({ name: ATTR_COLUMN_PERMISSION_GROUP.CHAR_DESCRIPTION })
  @Column({
    name: ATTR_COLUMN_PERMISSION_GROUP.CHAR_DESCRIPTION,
    length: 50,
    update: false,
  })
  [ATTR_COLUMN_PERMISSION_GROUP.CHAR_DESCRIPTION]: string;

  @Expose({ name: ATTR_COLUMN_PERMISSION_GROUP.INT_CREATED_BY })
  @Column({
    name: ATTR_COLUMN_PERMISSION_GROUP.INT_CREATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_PERMISSION_GROUP.INT_CREATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_PERMISSION_GROUP.INT_UPDATED_BY })
  @Column({
    name: ATTR_COLUMN_PERMISSION_GROUP.INT_UPDATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_PERMISSION_GROUP.INT_UPDATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_PERMISSION_GROUP.DATETIME_CREATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_PERMISSION_GROUP.DATETIME_CREATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  [ATTR_COLUMN_PERMISSION_GROUP.DATETIME_CREATED]?: Date;

  @Expose({ name: ATTR_COLUMN_PERMISSION_GROUP.DATETIME_UPDATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_PERMISSION_GROUP.DATETIME_UPDATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
  })
  [ATTR_COLUMN_PERMISSION_GROUP.DATETIME_UPDATED]?: Date;

  @Expose({ name: ATTR_COLUMN_PERMISSION_GROUP.DATETIME_DELETED })
  @DeleteDateColumn({
    name: ATTR_COLUMN_PERMISSION_GROUP.DATETIME_DELETED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    select: false,
  })
  [ATTR_COLUMN_PERMISSION_GROUP.DATETIME_DELETED]?: Date;

  @Expose({ name: ATTR_COLUMN_PERMISSION_GROUP.CHAR_ENCRYPTION })
  [ATTR_COLUMN_PERMISSION_GROUP.CHAR_ENCRYPTION]?: string;

  @AfterLoad()
  encodeValue() {
    this[ATTR_COLUMN_PERMISSION_GROUP.CHAR_ENCRYPTION] = encodedID(this.id);
  }
}
