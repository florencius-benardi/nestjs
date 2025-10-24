import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { encodedID } from '../../app/commons/utils/hashId.util';
import { Expose } from 'class-transformer';
import {
  ATTR_COLUMN_PERMISSION_GROUP,
  PermissionGroups,
} from './permissionGroup.entity';
import {
  ATTR_COLUMN_PERMISSION_SUB_GROUP,
  PermissionSubGroups,
} from './permissionSubGroup.entity';

export const ATTR_TABLE_PERMISSION = 'permissions';
export const ATTR_COLUMN_PERMISSION = {
  CHAR_DESCRIPTION: 'description',
  CHAR_OBJECT: 'object',
  INT_ID: 'id',
  INT_GROUP: 'permission_group_id',
  INT_SUB_GROUP: 'permission_sub_group_id',
  INT_CREATED_BY: 'created_by_id',
  INT_UPDATED_BY: 'updated_by_id',
  DATETIME_CREATED: 'created_at',
  DATETIME_UPDATED: 'updated_at',
  DATETIME_DELETED: 'deleted_at',
  CHAR_ENCRYPTION: 'encryption_id',
  RELATION_GROUP: 'permission_group',
  RELATION_SUB_GROUP: 'permission_sub_group',
} as const;

@Entity({ name: ATTR_TABLE_PERMISSION })
export class Permissions {
  @Expose({ name: ATTR_COLUMN_PERMISSION.INT_ID })
  @PrimaryGeneratedColumn({
    name: ATTR_COLUMN_PERMISSION.INT_ID,
    type: process.env.DB_TYPE === 'postgres' ? 'bigint' : 'int',
    unsigned: true,
  })
  [ATTR_COLUMN_PERMISSION.INT_ID]: number;

  @Expose({ name: ATTR_COLUMN_PERMISSION.CHAR_OBJECT })
  @Column({
    name: ATTR_COLUMN_PERMISSION.CHAR_OBJECT,
    length: 12,
    unique: true,
    update: false,
  })
  [ATTR_COLUMN_PERMISSION.CHAR_OBJECT]: string;

  @Expose({ name: ATTR_COLUMN_PERMISSION.CHAR_DESCRIPTION })
  @Column({
    name: ATTR_COLUMN_PERMISSION.CHAR_DESCRIPTION,
    length: 50,
    update: false,
  })
  [ATTR_COLUMN_PERMISSION.CHAR_DESCRIPTION]: string;

  @Expose({ name: ATTR_COLUMN_PERMISSION.INT_GROUP })
  @Column({
    name: ATTR_COLUMN_PERMISSION.INT_GROUP,
    nullable: false,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_PERMISSION.INT_GROUP]: number;

  @Expose({ name: ATTR_COLUMN_PERMISSION.INT_SUB_GROUP })
  @Column({
    name: ATTR_COLUMN_PERMISSION.INT_SUB_GROUP,
    nullable: false,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_PERMISSION.INT_SUB_GROUP]: number;

  @Expose({ name: ATTR_COLUMN_PERMISSION.INT_CREATED_BY })
  @Column({
    name: ATTR_COLUMN_PERMISSION.INT_CREATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_PERMISSION.INT_CREATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_PERMISSION.INT_UPDATED_BY })
  @Column({
    name: ATTR_COLUMN_PERMISSION.INT_UPDATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_PERMISSION.INT_UPDATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_PERMISSION.DATETIME_CREATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_PERMISSION.DATETIME_CREATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  [ATTR_COLUMN_PERMISSION.DATETIME_CREATED]?: Date;

  @Expose({ name: ATTR_COLUMN_PERMISSION.DATETIME_UPDATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_PERMISSION.DATETIME_UPDATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
  })
  [ATTR_COLUMN_PERMISSION.DATETIME_UPDATED]?: Date;

  @Expose({ name: ATTR_COLUMN_PERMISSION.DATETIME_DELETED })
  @DeleteDateColumn({
    name: ATTR_COLUMN_PERMISSION.DATETIME_DELETED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    select: false,
  })
  [ATTR_COLUMN_PERMISSION.DATETIME_DELETED]?: Date;

  @Expose({ name: ATTR_COLUMN_PERMISSION.CHAR_ENCRYPTION })
  [ATTR_COLUMN_PERMISSION.CHAR_ENCRYPTION]?: string;

  @Expose({ name: ATTR_COLUMN_PERMISSION.RELATION_GROUP })
  @ManyToOne(() => PermissionGroups, {
    nullable: true,
  })
  @JoinColumn({
    name: ATTR_COLUMN_PERMISSION.INT_GROUP,
    referencedColumnName: ATTR_COLUMN_PERMISSION_GROUP.INT_ID,
  })
  [ATTR_COLUMN_PERMISSION.RELATION_GROUP]?: PermissionGroups;

  @Expose({ name: ATTR_COLUMN_PERMISSION.RELATION_SUB_GROUP })
  @ManyToOne(() => PermissionSubGroups, {
    nullable: true,
  })
  @JoinColumn({
    name: ATTR_COLUMN_PERMISSION.INT_SUB_GROUP,
    referencedColumnName: ATTR_COLUMN_PERMISSION_SUB_GROUP.INT_ID,
  })
  [ATTR_COLUMN_PERMISSION.RELATION_SUB_GROUP]?: PermissionSubGroups;

  @AfterLoad()
  encodeValue() {
    this[ATTR_COLUMN_PERMISSION.CHAR_ENCRYPTION] = encodedID(this.id);
  }
}
