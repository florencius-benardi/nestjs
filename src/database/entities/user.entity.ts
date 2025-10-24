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

export const ATTR_TABLE_USER = 'users';
export const ATTR_COLUMN_USER = {
  CHAR_USERNAME: 'username',
  CHAR_FIRSTNAME: 'first_name',
  CHAR_LASTNAME: 'last_name',
  CHAR_EMAIL: 'email',
  CHAR_PASSWORD: 'password',
  CHAR_CONFIRMATION_CODE: 'confirmation_code',
  CHAR_TOKEN: 'token',
  INT_ID: 'id',
  INT_COUNT_WRONG_PASS: 'wrong_pass',
  INT_STATUS: 'status',
  INT_CREATED_BY: 'created_by_id',
  INT_UPDATED_BY: 'updated_by_id',
  DATETIME_CREATED: 'created_at',
  DATETIME_UPDATED: 'updated_at',
  DATETIME_DELETED: 'deleted_at',
  CHAR_ENCRYPTION: 'encryption_id',
  RELATION_UPDATED_BY: 'updated_by',
  RELATION_CREATED_BY: 'created_by',
} as const;

@Entity({ name: ATTR_TABLE_USER })
// @Unique(`UK_username`, [ATTR_COLUMN_USER.CHAR_USERNAME])
// @Unique(`UK_email`, [ATTR_COLUMN_USER.CHAR_EMAIL])
export class Users {
  @Expose({ name: ATTR_COLUMN_USER.INT_ID })
  @PrimaryGeneratedColumn({
    name: ATTR_COLUMN_USER.INT_ID,
    type: process.env.DB_TYPE === 'postgres' ? 'bigint' : 'int',
    unsigned: true,
  })
  [ATTR_COLUMN_USER.INT_ID]: number;

  @Expose({ name: ATTR_COLUMN_USER.CHAR_USERNAME })
  @Column({
    name: ATTR_COLUMN_USER.CHAR_USERNAME,
    length: 25,
    unique: true,
    update: false,
  })
  [ATTR_COLUMN_USER.CHAR_USERNAME]: string;

  @Expose({ name: ATTR_COLUMN_USER.CHAR_FIRSTNAME })
  @Column({ name: ATTR_COLUMN_USER.CHAR_FIRSTNAME, length: 25 })
  [ATTR_COLUMN_USER.CHAR_FIRSTNAME]: string;

  @Expose({ name: ATTR_COLUMN_USER.CHAR_LASTNAME })
  @Column({
    name: ATTR_COLUMN_USER.CHAR_LASTNAME,
    length: 25,
    nullable: true,
  })
  [ATTR_COLUMN_USER.CHAR_LASTNAME]: string | null;

  @Column({
    name: ATTR_COLUMN_USER.CHAR_EMAIL,
    length: 125,
    nullable: false,
    unique: true,
  })
  [ATTR_COLUMN_USER.CHAR_EMAIL]: string;

  @Expose({ name: ATTR_COLUMN_USER.CHAR_PASSWORD })
  @Column({
    name: ATTR_COLUMN_USER.CHAR_PASSWORD,
    length: 125,
    nullable: false,
    select: false,
  })
  [ATTR_COLUMN_USER.CHAR_PASSWORD]: string;

  @Expose({ name: ATTR_COLUMN_USER.CHAR_CONFIRMATION_CODE })
  @Column({
    name: ATTR_COLUMN_USER.CHAR_CONFIRMATION_CODE,
    length: 255,
    nullable: true,
    select: false,
  })
  [ATTR_COLUMN_USER.CHAR_CONFIRMATION_CODE]: string | null;

  @Expose({ name: ATTR_COLUMN_USER.INT_STATUS })
  @Column({
    name: ATTR_COLUMN_USER.INT_STATUS,
    default: 1,
    nullable: false,
    type: 'mediumint',
    unsigned: true,
  })
  [ATTR_COLUMN_USER.INT_STATUS]: number | null;

  @Expose({ name: ATTR_COLUMN_USER.INT_COUNT_WRONG_PASS })
  @Column({
    name: ATTR_COLUMN_USER.INT_COUNT_WRONG_PASS,
    default: null,
    nullable: true,
    type: 'mediumint',
    unsigned: true,
  })
  [ATTR_COLUMN_USER.INT_COUNT_WRONG_PASS]: number | null;

  @Expose({ name: ATTR_COLUMN_USER.INT_CREATED_BY })
  @Column({
    name: ATTR_COLUMN_USER.INT_CREATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_USER.INT_CREATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_USER.INT_UPDATED_BY })
  @Column({
    name: ATTR_COLUMN_USER.INT_UPDATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_USER.INT_UPDATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_USER.DATETIME_CREATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_USER.DATETIME_CREATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  [ATTR_COLUMN_USER.DATETIME_CREATED]?: Date;

  @Expose({ name: ATTR_COLUMN_USER.DATETIME_UPDATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_USER.DATETIME_UPDATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
  })
  [ATTR_COLUMN_USER.DATETIME_UPDATED]?: Date;

  @Expose({ name: ATTR_COLUMN_USER.DATETIME_DELETED })
  @DeleteDateColumn({
    name: ATTR_COLUMN_USER.DATETIME_DELETED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    select: false,
  })
  [ATTR_COLUMN_USER.DATETIME_DELETED]?: Date;

  @Expose({ name: ATTR_COLUMN_USER.CHAR_ENCRYPTION })
  [ATTR_COLUMN_USER.CHAR_ENCRYPTION]?: string;

  @AfterLoad()
  encodeValue() {
    this[ATTR_COLUMN_USER.CHAR_ENCRYPTION] = encodedID(this.id);
  }

  // RELATION
  // 👇 Relation field (the single user who updated this record)
  @Expose({ name: ATTR_COLUMN_USER.RELATION_CREATED_BY })
  @ManyToOne(() => Users, {
    nullable: true,
  })
  @JoinColumn({
    name: ATTR_COLUMN_USER.INT_CREATED_BY,
    referencedColumnName: ATTR_COLUMN_USER.INT_ID,
  })
  [ATTR_COLUMN_USER.RELATION_CREATED_BY]?: Users;

  @Expose({ name: ATTR_COLUMN_USER.RELATION_UPDATED_BY })
  @ManyToOne(() => Users, { nullable: true })
  @JoinColumn({
    name: ATTR_COLUMN_USER.INT_UPDATED_BY,
    referencedColumnName: ATTR_COLUMN_USER.INT_ID,
  })
  [ATTR_COLUMN_USER.RELATION_UPDATED_BY]?: Users;

  // @OneToOne(() => User, (user) => user.createdUsers, { nullable: true })
  // @JoinColumn({ name: ATTR_COLUMN_USER.INT_CREATED_BY })
  // createdBy?: User;

  // @OneToMany(() => User, (user) => user[ATTR_COLUMN_USER.created])
  // usersCreated?: User[];

  // @OneToMany(() => User, (user) => user.updatedBy)
  // usersUpdated?: User[];

  // @OneToMany(() => User, (user) => user.updatedBy)
  // updatedUsers?: User[];
}
