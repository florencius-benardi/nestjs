import { TypeOrmModuleOptions } from '@nestjs/typeorm';

type DBType =
  | 'mysql'
  | 'mariadb'
  | 'postgres'
  | 'sqlite'
  | 'mongodb'
  | 'cockroachdb'
  | 'mssql'
  | 'oracle'
  | 'spanner';

const dbType = (process.env.DB_TYPE as DBType) || 'postgres';

export const typeOrmConfig: TypeOrmModuleOptions = {
  name: 'transaction',
  type: dbType,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  logging: true,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'nestdb',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

// import "reflect-metadata"
// import { DataSource } from "typeorm"
// import { User } from "./entity/User"

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "test",
//     password: "test",
//     database: "test",
//     synchronize: true,
//     logging: false,
//     entities: [User],
//     migrations: [],
//     subscribers: [],
// })
