/** @format */

import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { UsersDB } from "../../people/entity/Users.db";
import { BaseDB } from "../../../utils/Base.db";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class CoursesDB extends BaseDB {
	@Column()
	@IsString()
	@Transform((param) => String(param.value).toLowerCase())
	title: string;

	@ManyToMany(() => UsersDB)
	@JoinTable()
	studens?: UsersDB[];
}
