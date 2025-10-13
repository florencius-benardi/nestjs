import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export const ATTR_TABLE_USER = 'users';
export const ATTR_COLUMN_USER = {
  ATTR_CHAR_USERNAME: 'username',
  ATTR_CHAR_FIRSTNAME: 'first_name',
  ATTR_CHAR_LASTNAME: 'last_name',
  ATTR_CHAR_EMAIL: 'email',
  ATTR_CHAR_PASSWORD: 'password',
  ATTR_CHAR_CONFIRMATION_CODE: 'confirmation_code',
  ATTR_CHAR_TOKEN: 'token',
  ATTR_INT_ID: 'id',
  ATTR_INT_STATUS: 'status',
  ATTR_INT_CREATED_BY: 'created_by_id',
  ATTR_INT_UPDATED_BY: 'updated_by_id',
  ATTR_DATETIME_CREATED: 'created_at',
  ATTR_DATETIME_UPDATED: 'updated_at',
  ATTR_DATETIME_DELETED: 'deleted_at',
} as const;

@Entity({ name: ATTR_TABLE_USER })
// @Unique(`UK_username`, [ATTR_COLUMN_USER.ATTR_CHAR_USERNAME])
// @Unique(`UK_email`, [ATTR_COLUMN_USER.ATTR_CHAR_EMAIL])
export class User {
  @PrimaryGeneratedColumn({
    name: ATTR_COLUMN_USER.ATTR_INT_ID,
    type: process.env.DB_TYPE === 'postgres' ? 'bigint' : 'int',
    unsigned: true,
  })
  id: number;

  @Column({
    name: ATTR_COLUMN_USER.ATTR_CHAR_USERNAME,
    length: 25,
    unique: true,
    update: false,
  })
  userName: string;

  @Column({ name: ATTR_COLUMN_USER.ATTR_CHAR_FIRSTNAME, length: 25 })
  firstName: string;

  @Column({
    name: ATTR_COLUMN_USER.ATTR_CHAR_LASTNAME,
    length: 25,
    nullable: true,
  })
  lastName: string | null;

  @Column({
    name: ATTR_COLUMN_USER.ATTR_CHAR_EMAIL,
    length: 125,
    nullable: false,
  })
  email: string;

  @Column({
    name: ATTR_COLUMN_USER.ATTR_CHAR_PASSWORD,
    length: 125,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    name: ATTR_COLUMN_USER.ATTR_CHAR_CONFIRMATION_CODE,
    length: 255,
    nullable: true,
    select: false,
  })
  confirmationCode: string | null;

  @Column({
    name: ATTR_COLUMN_USER.ATTR_INT_STATUS,
    default: 1,
    nullable: false,
    type: 'mediumint',
    unsigned: true,
  })
  status: number | null;

  @Column({
    name: ATTR_COLUMN_USER.ATTR_INT_CREATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  createdById: number | null;

  @Column({
    name: ATTR_COLUMN_USER.ATTR_INT_UPDATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  updatedById: number | null;

  @CreateDateColumn({
    name: ATTR_COLUMN_USER.ATTR_DATETIME_CREATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @CreateDateColumn({
    name: ATTR_COLUMN_USER.ATTR_DATETIME_UPDATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: ATTR_COLUMN_USER.ATTR_DATETIME_DELETED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    select: false,
  })
  deletedAt?: Date;
}
