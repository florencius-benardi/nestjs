import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { encodedID } from '../../app/commons/utils/hashId.util';
import { Expose } from 'class-transformer';

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
  ATTR_CHAR_ENCRYPTION: 'encryption_id',
  ATTR_RELATION_UPDATED_BY: 'updated_by',
  ATTR_RELATION_CREATED_BY: 'created_by',
} as const;

@Entity({ name: ATTR_TABLE_USER })
// @Unique(`UK_username`, [ATTR_COLUMN_USER.ATTR_CHAR_USERNAME])
// @Unique(`UK_email`, [ATTR_COLUMN_USER.ATTR_CHAR_EMAIL])
export class User {
  @Expose({ name: ATTR_COLUMN_USER.ATTR_INT_ID })
  @PrimaryGeneratedColumn({
    name: ATTR_COLUMN_USER.ATTR_INT_ID,
    type: process.env.DB_TYPE === 'postgres' ? 'bigint' : 'int',
    unsigned: true,
  })
  id: number;

  @Expose({ name: ATTR_COLUMN_USER.ATTR_CHAR_USERNAME })
  @Column({
    name: ATTR_COLUMN_USER.ATTR_CHAR_USERNAME,
    length: 25,
    unique: true,
    update: false,
  })
  userName: string;

  @Expose({ name: ATTR_COLUMN_USER.ATTR_CHAR_FIRSTNAME })
  @Column({ name: ATTR_COLUMN_USER.ATTR_CHAR_FIRSTNAME, length: 25 })
  firstName: string;

  @Expose({ name: ATTR_COLUMN_USER.ATTR_CHAR_LASTNAME })
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

  @Expose({ name: ATTR_COLUMN_USER.ATTR_CHAR_PASSWORD })
  @Column({
    name: ATTR_COLUMN_USER.ATTR_CHAR_PASSWORD,
    length: 125,
    nullable: false,
    select: false,
  })
  password: string;

  @Expose({ name: ATTR_COLUMN_USER.ATTR_CHAR_CONFIRMATION_CODE })
  @Column({
    name: ATTR_COLUMN_USER.ATTR_CHAR_CONFIRMATION_CODE,
    length: 255,
    nullable: true,
    select: false,
  })
  confirmationCode: string | null;

  @Expose({ name: ATTR_COLUMN_USER.ATTR_INT_STATUS })
  @Column({
    name: ATTR_COLUMN_USER.ATTR_INT_STATUS,
    default: 1,
    nullable: false,
    type: 'mediumint',
    unsigned: true,
  })
  status: number | null;

  @Expose({ name: ATTR_COLUMN_USER.ATTR_INT_CREATED_BY })
  @Column({
    name: ATTR_COLUMN_USER.ATTR_INT_CREATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  createdById: number | null;

  @Expose({ name: ATTR_COLUMN_USER.ATTR_INT_UPDATED_BY })
  @Column({
    name: ATTR_COLUMN_USER.ATTR_INT_UPDATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  updatedById: number | null;

  @Expose({ name: ATTR_COLUMN_USER.ATTR_DATETIME_CREATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_USER.ATTR_DATETIME_CREATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Expose({ name: ATTR_COLUMN_USER.ATTR_DATETIME_UPDATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_USER.ATTR_DATETIME_UPDATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
  })
  updatedAt?: Date;

  @Expose({ name: ATTR_COLUMN_USER.ATTR_DATETIME_DELETED })
  @DeleteDateColumn({
    name: ATTR_COLUMN_USER.ATTR_DATETIME_DELETED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    select: false,
  })
  deletedAt?: Date;

  @Expose({ name: ATTR_COLUMN_USER.ATTR_CHAR_ENCRYPTION })
  encryptionId?: string;

  @AfterLoad()
  encodeValue() {
    this.encryptionId = encodedID(this.id);
  }

  // RELATION
  // 👇 Relation field (the single user who updated this record)
  @Expose({ name: ATTR_COLUMN_USER.ATTR_RELATION_CREATED_BY })
  @ManyToOne(() => User, {
    nullable: true,
  })
  @JoinColumn({
    name: ATTR_COLUMN_USER.ATTR_INT_CREATED_BY,
    referencedColumnName: ATTR_COLUMN_USER.ATTR_INT_ID,
  })
  createdBy?: User;

  @Expose({ name: ATTR_COLUMN_USER.ATTR_RELATION_UPDATED_BY })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({
    name: ATTR_COLUMN_USER.ATTR_INT_UPDATED_BY,
    referencedColumnName: ATTR_COLUMN_USER.ATTR_INT_ID,
  })
  updatedBy?: User;

  // @OneToOne(() => User, (user) => user.createdUsers, { nullable: true })
  // @JoinColumn({ name: ATTR_COLUMN_USER.ATTR_INT_CREATED_BY })
  // createdBy?: User;

  @OneToMany(() => User, (user) => user.createdBy)
  usersCreated?: User[];

  @OneToMany(() => User, (user) => user.updatedBy)
  usersUpdated?: User[];

  // @OneToMany(() => User, (user) => user.updatedBy)
  // updatedUsers?: User[];
}
