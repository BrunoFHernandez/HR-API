import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/user';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Chave@2025',
  database: process.env.DB_NAME || 'hr_api',
  synchronize: true, 
  logging: false,
  entities: [User],
});