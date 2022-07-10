/** @format */

import { IsAlpha, IsDate, IsEmail, IsAlphanumeric, IsString } from "class-validator";
import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseDB } from "../../../utils/Base.db";
import { Transform } from "class-transformer";
import { RolsDB } from "./Rols.db";
import { CoursesDB } from "../../courses/entity/Courses.db";

@Entity()
@Index(["id", "email"], { unique: true })
export class UsersDB extends BaseDB {
	@Column()
	@IsEmail()
	email: string;

	@Column()
	@IsString()
	@Transform((param) => String(param.value).toLowerCase())
	firsName: string;

	@Column()
	@IsString()
	@Transform((param) => String(param.value).toLowerCase())
	lastName: string;

	@Column()
	password: string;

	@ManyToOne(() => RolsDB, (RolsDB) => RolsDB.Users)
	rol: RolsDB | number;

	@ManyToMany(() => CoursesDB)
	@JoinTable()
	courses?: CoursesDB[];
}
