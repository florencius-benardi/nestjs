import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

export const ATTR_TABLE_TOKEN = 'personal_access_token';
export const ATTR_COLUMN_TOKEN = {
  CHAR_NAME: 'name',
  CHAR_TYPE: 'type',
  CHAR_TOKEN: 'token',
  CHAR_ID: 'uuid',
  JSON_ABILITIES: 'abilities',
  INT_USER: 'grant_to_id',
  DATETIME_EXPIRES: 'expires_at',
  DATETIME_CREATED: 'created_at',
  DATETIME_UPDATED: 'updated_at',
} as const;

@Entity({ name: ATTR_TABLE_TOKEN })
export class PersonalAccessToken {
  @Expose({ name: ATTR_COLUMN_TOKEN.CHAR_ID })
  @PrimaryGeneratedColumn('uuid')
  [ATTR_COLUMN_TOKEN.CHAR_ID]: string;

  @Expose({ name: ATTR_COLUMN_TOKEN.CHAR_NAME })
  @Column({
    name: ATTR_COLUMN_TOKEN.CHAR_NAME,
    length: 50,
    update: false,
  })
  [ATTR_COLUMN_TOKEN.CHAR_NAME]: string;

  @Expose({ name: ATTR_COLUMN_TOKEN.CHAR_TYPE })
  @Column({
    name: ATTR_COLUMN_TOKEN.CHAR_TYPE,
    length: 25,
    type: 'varchar',
    nullable: false,
  })
  [ATTR_COLUMN_TOKEN.CHAR_TYPE]: string;

  @Expose({ name: ATTR_COLUMN_TOKEN.CHAR_TOKEN })
  @Column({
    name: ATTR_COLUMN_TOKEN.CHAR_TOKEN,
    length: 100,
    type: 'varchar',
    nullable: false,
  })
  [ATTR_COLUMN_TOKEN.CHAR_TOKEN]: string;

  @Expose({ name: ATTR_COLUMN_TOKEN.INT_USER })
  @Column({
    name: ATTR_COLUMN_TOKEN.INT_USER,
    default: null,
    nullable: true,
    type: 'bigint',
    unsigned: true,
  })
  [ATTR_COLUMN_TOKEN.INT_USER]: number | null;

  @Expose({ name: ATTR_COLUMN_TOKEN.JSON_ABILITIES })
  @Column({
    name: ATTR_COLUMN_TOKEN.JSON_ABILITIES,
    default: null,
    type: 'json',
    nullable: true,
  })
  [ATTR_COLUMN_TOKEN.JSON_ABILITIES]: JSON | null;

  @Expose({ name: ATTR_COLUMN_TOKEN.DATETIME_EXPIRES })
  @Column({
    name: ATTR_COLUMN_TOKEN.DATETIME_EXPIRES,
    default: null,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    nullable: true,
  })
  [ATTR_COLUMN_TOKEN.DATETIME_EXPIRES]?: Date;

  @Expose({ name: ATTR_COLUMN_TOKEN.DATETIME_CREATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_TOKEN.DATETIME_CREATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  [ATTR_COLUMN_TOKEN.DATETIME_CREATED]?: Date;

  @Expose({ name: ATTR_COLUMN_TOKEN.DATETIME_UPDATED })
  @CreateDateColumn({
    name: ATTR_COLUMN_TOKEN.DATETIME_UPDATED,
    type: process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime',
  })
  [ATTR_COLUMN_TOKEN.DATETIME_UPDATED]?: Date;
}
