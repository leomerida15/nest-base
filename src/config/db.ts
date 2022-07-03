/** @format */

import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join, resolve } from "path";

const dbConfig = (): TypeOrmModuleOptions => ({
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATA,
	type: process.env.DB_TYPE as "postgres",
	entities: [join(resolve(), "src/**/**/*DB{.ts,.js}")],
	autoLoadEntities: true,
});

export default dbConfig;
