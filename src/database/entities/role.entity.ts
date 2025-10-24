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
import { ATTR_COLUMN_USER, Users } from './user.entity';

export const ATTR_TABLE_ROLE = 'roles';
export const ATTR_COLUMN_ROLE = {
  CHAR_DESCRIPTION: 'description',
  INT_ID: 'id',
  INT_CREATED_BY: 'created_by_id',
  INT_UPDATED_BY: 'updated_by_id',
  DATETIME_CREATED: 'created_at',
  DATETIME_UPDATED: 'updated_at',
  DATETIME_DELETED: 'deleted_at',
  CHAR_ENCRYPTION: 'encryption_id',
  RELATION_UPDATED_BY: 'updated_by',
  RELATION_CREATED_BY: 'created_by',
} as const;

@Entity({ name: ATTR_TABLE_ROLE })
export class Roles {
  @Expose({ name: ATTR_COLUMN_ROLE.INT_ID })
  @PrimaryGeneratedColumn({
    name: ATTR_COLUMN_ROLE.INT_ID,
    type: process.env.DB_TYPE === 'postgres' ? 'bigint' : 'int',
    unsigned: true,
  })
  [ATTR_COLUMN_ROLE.INT_ID]: number;

  @Expose({ name: ATTR_COLUMN_ROLE.CHAR_DESCRIPTION })
  @Column({
    name: ATTR_COLUMN_ROLE.CHAR_DESCRIPTION,
    length: 50,
    update: false,
  })
  [ATTR_COLUMN_ROLE.CHAR_DESCRIPTION]: string;

  @Expose({ name: ATTR_COLUMN_ROLE.INT_CREATED_BY })
  @Column({
    name: ATTR_COLUMN_ROLE.INT_CREATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_ROLE.INT_CREATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_ROLE.INT_UPDATED_BY })
  @Column({
    name: ATTR_COLUMN_ROLE.INT_UPDATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_ROLE.INT_UPDATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_ROLE.DATETIME_CREATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_ROLE.DATETIME_CREATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  [ATTR_COLUMN_ROLE.DATETIME_CREATED]?: Date;

  @Expose({ name: ATTR_COLUMN_ROLE.DATETIME_UPDATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_ROLE.DATETIME_UPDATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
  })
  [ATTR_COLUMN_ROLE.DATETIME_UPDATED]?: Date;

  @Expose({ name: ATTR_COLUMN_ROLE.DATETIME_DELETED })
  @DeleteDateColumn({
    name: ATTR_COLUMN_ROLE.DATETIME_DELETED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    select: false,
  })
  [ATTR_COLUMN_ROLE.DATETIME_DELETED]?: Date;

  @Expose({ name: ATTR_COLUMN_ROLE.CHAR_ENCRYPTION })
  [ATTR_COLUMN_ROLE.CHAR_ENCRYPTION]?: string;

  @Expose({ name: ATTR_COLUMN_ROLE.RELATION_CREATED_BY })
  @ManyToOne(() => Users, {
    nullable: true,
  })
  @JoinColumn({
    name: ATTR_COLUMN_USER.INT_CREATED_BY,
    referencedColumnName: ATTR_COLUMN_USER.INT_ID,
  })
  [ATTR_COLUMN_ROLE.RELATION_CREATED_BY]?: Users;

  @Expose({ name: ATTR_COLUMN_ROLE.RELATION_UPDATED_BY })
  @ManyToOne(() => Users, { nullable: true })
  @JoinColumn({
    name: ATTR_COLUMN_USER.INT_UPDATED_BY,
    referencedColumnName: ATTR_COLUMN_USER.INT_ID,
  })
  [ATTR_COLUMN_ROLE.RELATION_UPDATED_BY]?: Users;

  @AfterLoad()
  encodeValue() {
    this[ATTR_COLUMN_ROLE.CHAR_ENCRYPTION] = encodedID(this.id);
  }
}
