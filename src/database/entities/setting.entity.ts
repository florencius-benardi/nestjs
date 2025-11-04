import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { encodedID } from '../../app/commons/utils/hashId.util';
import { Expose } from 'class-transformer';
import { Users } from './user.entity';

export const ATTR_TABLE_SETTING = 'settings';
export const ATTR_COLUMN_SETTING = {
  CHAR_KEY: 'key',
  CHAR_NAME: 'name',
  CHAR_TYPE: 'type',
  CHAR_COLUMN_TYPE: 'column_type',
  CHAR_REFERENCE: 'reference',
  JSON_OPTIONS: 'options',
  CHAR_VALUE: 'value',
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

@Entity({ name: ATTR_TABLE_SETTING })
@Unique([ATTR_COLUMN_SETTING.CHAR_KEY, ATTR_COLUMN_SETTING.CHAR_TYPE])
export class Settings {
  @Expose({ name: ATTR_COLUMN_SETTING.INT_ID })
  @PrimaryGeneratedColumn({
    name: ATTR_COLUMN_SETTING.INT_ID,
    type: process.env.DB_TYPE === 'postgres' ? 'bigint' : 'int',
    unsigned: true,
  })
  [ATTR_COLUMN_SETTING.INT_ID]: number;

  @Expose({ name: ATTR_COLUMN_SETTING.CHAR_KEY })
  @Column({
    name: ATTR_COLUMN_SETTING.CHAR_KEY,
    length: 50,
    update: false,
  })
  [ATTR_COLUMN_SETTING.CHAR_KEY]: string;

  @Expose({ name: ATTR_COLUMN_SETTING.CHAR_NAME })
  @Column({
    name: ATTR_COLUMN_SETTING.CHAR_NAME,
    length: 50,
    update: false,
  })
  [ATTR_COLUMN_SETTING.CHAR_NAME]: string;

  @Expose({ name: ATTR_COLUMN_SETTING.CHAR_TYPE })
  @Column({ name: ATTR_COLUMN_SETTING.CHAR_TYPE, length: 25 })
  [ATTR_COLUMN_SETTING.CHAR_TYPE]: string;

  @Expose({ name: ATTR_COLUMN_SETTING.CHAR_COLUMN_TYPE })
  @Column({ name: ATTR_COLUMN_SETTING.CHAR_COLUMN_TYPE, length: 50 })
  [ATTR_COLUMN_SETTING.CHAR_COLUMN_TYPE]: string;

  @Expose({ name: ATTR_COLUMN_SETTING.CHAR_REFERENCE })
  @Column({
    name: ATTR_COLUMN_SETTING.CHAR_REFERENCE,
    length: 25,
    nullable: true,
  })
  [ATTR_COLUMN_SETTING.CHAR_REFERENCE]: string | null;

  @Expose({ name: ATTR_COLUMN_SETTING.JSON_OPTIONS })
  @Column({
    name: ATTR_COLUMN_SETTING.JSON_OPTIONS,
    default: null,
    type: 'json',
    nullable: true,
  })
  [ATTR_COLUMN_SETTING.JSON_OPTIONS]: JSON | null;

  @Expose({ name: ATTR_COLUMN_SETTING.CHAR_VALUE })
  @Column({
    name: ATTR_COLUMN_SETTING.CHAR_VALUE,
    type: 'text',
    nullable: false,
  })
  [ATTR_COLUMN_SETTING.CHAR_VALUE]: string;

  @Expose({ name: ATTR_COLUMN_SETTING.INT_CREATED_BY })
  @Column({
    name: ATTR_COLUMN_SETTING.INT_CREATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_SETTING.INT_CREATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_SETTING.INT_UPDATED_BY })
  @Column({
    name: ATTR_COLUMN_SETTING.INT_UPDATED_BY,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_SETTING.INT_UPDATED_BY]: number | null;

  @Expose({ name: ATTR_COLUMN_SETTING.DATETIME_CREATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_SETTING.DATETIME_CREATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  [ATTR_COLUMN_SETTING.DATETIME_CREATED]?: Date;

  @Expose({ name: ATTR_COLUMN_SETTING.DATETIME_UPDATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_SETTING.DATETIME_UPDATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
  })
  [ATTR_COLUMN_SETTING.DATETIME_UPDATED]?: Date;

  @Expose({ name: ATTR_COLUMN_SETTING.DATETIME_DELETED })
  @DeleteDateColumn({
    name: ATTR_COLUMN_SETTING.DATETIME_DELETED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    select: false,
  })
  [ATTR_COLUMN_SETTING.DATETIME_DELETED]?: Date;

  @Expose({ name: ATTR_COLUMN_SETTING.CHAR_ENCRYPTION })
  [ATTR_COLUMN_SETTING.CHAR_ENCRYPTION]?: string;

  // RELATION
  @Expose({ name: ATTR_COLUMN_SETTING.RELATION_CREATED_BY })
  @ManyToOne(() => Users, {
    nullable: true,
  })
  @JoinColumn({
    name: ATTR_COLUMN_SETTING.INT_CREATED_BY,
    referencedColumnName: ATTR_COLUMN_SETTING.INT_ID,
  })
  [ATTR_COLUMN_SETTING.RELATION_CREATED_BY]?: Users;

  @Expose({ name: ATTR_COLUMN_SETTING.RELATION_UPDATED_BY })
  @ManyToOne(() => Users, { nullable: true })
  @JoinColumn({
    name: ATTR_COLUMN_SETTING.INT_UPDATED_BY,
    referencedColumnName: ATTR_COLUMN_SETTING.INT_ID,
  })
  [ATTR_COLUMN_SETTING.RELATION_UPDATED_BY]?: Users;

  @AfterLoad()
  encodeValue() {
    this[ATTR_COLUMN_SETTING.CHAR_ENCRYPTION] = encodedID(this.id);
  }
}
