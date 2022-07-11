/** @format */

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { PeopleModule } from "./modules/people/people.module";
import { PostModule } from "./modules/post/post.module";
import { AdminModule } from "./modules/admin/admin.module";
import { CoursesModule } from "./modules/courses/courses.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				...configService.get<TypeOrmModuleOptions>("db"),
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		PeopleModule,
		PostModule,
		AdminModule,
		CoursesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
