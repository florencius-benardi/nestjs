import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ATTR_COLUMN_ROLE, Roles } from './role.entity';
import { ATTR_COLUMN_PERMISSION, Permissions } from './permission.entity';

export const ATTR_TABLE_ROLE_PERMISSION = 'role_permissions';
export const ATTR_COLUMN_ROLE_PERMISSION = {
  INT_ID: 'id',
  INT_ROLE: 'role_id',
  INT_PERMISSION: 'permission_id',
  INT_CREATED_BY: 'created_by_id',
  INT_UPDATED_BY: 'updated_by_id',
  DATETIME_CREATED: 'created_at',
  DATETIME_UPDATED: 'updated_at',
  DATETIME_DELETED: 'deleted_at',
  CHAR_ENCRYPTION: 'encryption_id',
  RELATION_ROLE: 'role',
  RELATION_PERMISSION: 'permission',
} as const;

@Entity({ name: ATTR_TABLE_ROLE_PERMISSION })
@Unique([
  ATTR_COLUMN_ROLE_PERMISSION.INT_ROLE,
  ATTR_COLUMN_ROLE_PERMISSION.INT_PERMISSION,
])
export class RolePermissions {
  @Expose({ name: ATTR_COLUMN_ROLE_PERMISSION.INT_ID })
  @PrimaryGeneratedColumn({
    name: ATTR_COLUMN_ROLE_PERMISSION.INT_ID,
    type: process.env.DB_TYPE === 'postgres' ? 'bigint' : 'int',
    unsigned: true,
  })
  [ATTR_COLUMN_ROLE_PERMISSION.INT_ID]: number;

  @Expose({ name: ATTR_COLUMN_ROLE_PERMISSION.INT_ROLE })
  @Column({
    name: ATTR_COLUMN_ROLE_PERMISSION.INT_ROLE,
    nullable: false,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_ROLE_PERMISSION.INT_ROLE]: number;

  @Expose({ name: ATTR_COLUMN_ROLE_PERMISSION.INT_PERMISSION })
  @Column({
    name: ATTR_COLUMN_ROLE_PERMISSION.INT_PERMISSION,
    nullable: false,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_ROLE_PERMISSION.INT_PERMISSION]: number;

  @Expose({ name: ATTR_COLUMN_ROLE_PERMISSION.INT_CREATED_BY })
  @Column({
    name: ATTR_COLUMN_ROLE_PERMISSION.INT_CREATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_ROLE_PERMISSION.INT_CREATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_ROLE_PERMISSION.INT_UPDATED_BY })
  @Column({
    name: ATTR_COLUMN_ROLE_PERMISSION.INT_UPDATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_ROLE_PERMISSION.INT_UPDATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_ROLE_PERMISSION.DATETIME_CREATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_ROLE_PERMISSION.DATETIME_CREATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  [ATTR_COLUMN_ROLE_PERMISSION.DATETIME_CREATED]?: Date;

  @Expose({ name: ATTR_COLUMN_ROLE_PERMISSION.DATETIME_UPDATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_ROLE_PERMISSION.DATETIME_UPDATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
  })
  [ATTR_COLUMN_ROLE_PERMISSION.DATETIME_UPDATED]?: Date;

  @Expose({ name: ATTR_COLUMN_ROLE_PERMISSION.DATETIME_DELETED })
  @DeleteDateColumn({
    name: ATTR_COLUMN_ROLE_PERMISSION.DATETIME_DELETED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    select: false,
  })
  [ATTR_COLUMN_ROLE_PERMISSION.DATETIME_DELETED]?: Date;

  @Expose({ name: ATTR_COLUMN_ROLE_PERMISSION.CHAR_ENCRYPTION })
  [ATTR_COLUMN_ROLE_PERMISSION.CHAR_ENCRYPTION]?: string;

  @Expose({ name: ATTR_COLUMN_ROLE_PERMISSION.RELATION_ROLE })
  @ManyToOne(
    () => Roles,
    (role) => role[ATTR_COLUMN_ROLE.RELATION_ROLE_PERMISSIONS],
    {
      nullable: true,
    },
  )
  @JoinColumn({
    name: ATTR_COLUMN_ROLE_PERMISSION.INT_ROLE,
    referencedColumnName: ATTR_COLUMN_ROLE_PERMISSION.INT_ID,
  })
  [ATTR_COLUMN_ROLE_PERMISSION.RELATION_ROLE]?: Roles[];

  @Expose({ name: ATTR_COLUMN_ROLE_PERMISSION.RELATION_PERMISSION })
  @ManyToOne(
    () => Permissions,
    (permission) =>
      permission[ATTR_COLUMN_PERMISSION.RELATION_ROLE_PERMISSIONS],
    {
      nullable: true,
    },
  )
  @JoinColumn({
    name: ATTR_COLUMN_ROLE_PERMISSION.INT_PERMISSION,
    referencedColumnName: 'id',
  })
  [ATTR_COLUMN_ROLE_PERMISSION.RELATION_PERMISSION]?: Permissions;
}
