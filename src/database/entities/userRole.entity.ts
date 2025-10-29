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
import { Roles } from './role.entity';
import { ATTR_COLUMN_USER, Users } from './user.entity';

export const ATTR_TABLE_USER_ROLE = 'user_roles';
export const ATTR_COLUMN_USER_ROLE = {
  INT_ID: 'id',
  INT_ROLE: 'role_id',
  INT_USER: 'user_id',
  INT_CREATED_BY: 'created_by_id',
  INT_UPDATED_BY: 'updated_by_id',
  DATETIME_CREATED: 'created_at',
  DATETIME_UPDATED: 'updated_at',
  DATETIME_DELETED: 'deleted_at',
  CHAR_ENCRYPTION: 'encryption_id',
  RELATION_UPDATED_BY: 'updated_by',
  RELATION_CREATED_BY: 'created_by',
  RELATION_ROLE: 'role',
  RELATION_USER: 'user',
} as const;

@Entity({ name: ATTR_TABLE_USER_ROLE })
@Unique([ATTR_COLUMN_USER_ROLE.INT_USER, ATTR_COLUMN_USER_ROLE.INT_ROLE])
export class UserRoles {
  @PrimaryGeneratedColumn({
    name: ATTR_COLUMN_USER_ROLE.INT_ID,
    type: process.env.DB_TYPE === 'postgres' ? 'bigint' : 'int',
    unsigned: true,
  })
  [ATTR_COLUMN_USER_ROLE.INT_ID]: number;

  @Expose({ name: ATTR_COLUMN_USER_ROLE.INT_USER })
  @Column({
    name: ATTR_COLUMN_USER_ROLE.INT_USER,
    nullable: false,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_USER_ROLE.INT_USER]: number;

  @Expose({ name: ATTR_COLUMN_USER_ROLE.INT_ROLE })
  @Column({
    name: ATTR_COLUMN_USER_ROLE.INT_ROLE,
    nullable: false,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_USER_ROLE.INT_ROLE]: number;

  @Expose({ name: ATTR_COLUMN_USER_ROLE.INT_CREATED_BY })
  @Column({
    name: ATTR_COLUMN_USER_ROLE.INT_CREATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_USER_ROLE.INT_CREATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_USER_ROLE.INT_UPDATED_BY })
  @Column({
    name: ATTR_COLUMN_USER_ROLE.INT_UPDATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_USER_ROLE.INT_UPDATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_USER_ROLE.DATETIME_CREATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_USER_ROLE.DATETIME_CREATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  [ATTR_COLUMN_USER_ROLE.DATETIME_CREATED]?: Date;

  @Expose({ name: ATTR_COLUMN_USER_ROLE.DATETIME_UPDATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_USER_ROLE.DATETIME_UPDATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
  })
  [ATTR_COLUMN_USER_ROLE.DATETIME_UPDATED]?: Date;

  @Expose({ name: ATTR_COLUMN_USER_ROLE.DATETIME_DELETED })
  @DeleteDateColumn({
    name: ATTR_COLUMN_USER_ROLE.DATETIME_DELETED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    select: false,
  })
  [ATTR_COLUMN_USER_ROLE.DATETIME_DELETED]?: Date;

  @Expose({ name: ATTR_COLUMN_USER_ROLE.CHAR_ENCRYPTION })
  [ATTR_COLUMN_USER_ROLE.CHAR_ENCRYPTION]?: string;

  // RELATION
  @Expose({ name: ATTR_COLUMN_USER_ROLE.RELATION_CREATED_BY })
  @ManyToOne(() => Users, {
    nullable: true,
  })
  @JoinColumn({
    name: ATTR_COLUMN_USER_ROLE.INT_CREATED_BY,
    referencedColumnName: 'id',
  })
  [ATTR_COLUMN_USER_ROLE.RELATION_CREATED_BY]?: Users;

  @Expose({ name: ATTR_COLUMN_USER_ROLE.RELATION_UPDATED_BY })
  @ManyToOne(() => Users, { nullable: true })
  @JoinColumn({
    name: ATTR_COLUMN_USER_ROLE.INT_UPDATED_BY,
    referencedColumnName: 'id',
  })
  [ATTR_COLUMN_USER_ROLE.RELATION_UPDATED_BY]?: Users;

  @Expose({ name: ATTR_COLUMN_USER_ROLE.RELATION_ROLE })
  @ManyToOne(() => Roles, {
    nullable: true,
  })
  @JoinColumn({
    name: ATTR_COLUMN_USER_ROLE.INT_ROLE,
    referencedColumnName: 'id',
  })
  [ATTR_COLUMN_USER_ROLE.RELATION_ROLE]?: Roles;

  @Expose({ name: ATTR_COLUMN_USER_ROLE.RELATION_USER })
  @ManyToOne(
    () => Users,
    (user) => user[ATTR_COLUMN_USER.RELATION_USER_ROLES],
    {
      nullable: true,
    },
  )
  @JoinColumn({
    name: ATTR_COLUMN_USER_ROLE.INT_USER,
    referencedColumnName: 'id',
  })
  [ATTR_COLUMN_USER_ROLE.RELATION_USER]?: Users;
}
