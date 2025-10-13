import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config({
  path: '.env',
});

type DBType =
  | 'mysql'
  | 'mariadb'
  | 'postgres'
  | 'sqlite'
  | 'mongodb'
  | 'mssql'
  | 'oracle';

const dbType = (process.env.DB_TYPE?.toLowerCase() || 'sqlite') as DBType;
export default new DataSource({
  type: dbType,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [join(__dirname, './entities/*.entity.ts')],
  migrations: [
    join(__dirname, './migrations/*.ts'),
    join(__dirname, './seeders/*.ts'),
  ],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
});
