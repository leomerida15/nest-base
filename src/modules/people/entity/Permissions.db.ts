/** @format */

import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { BaseDB } from "src/utils/Base.db";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { RolsDB } from "./Rols.db";

@Entity()
export class PermissionsDB extends BaseDB {
	@Column()
	@IsString()
	@Transform((param) => String(param.value).toLowerCase())
	name: string;

	@ManyToMany(() => RolsDB)
	@JoinTable()
	rols?: RolsDB[];
}
