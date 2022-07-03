/** @format */

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoursesDB } from "./entity/Courses.db";

@Module({
	imports: [TypeOrmModule.forFeature([CoursesDB])],
})
export class CoursesModule {}
