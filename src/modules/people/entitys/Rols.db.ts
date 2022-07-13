/** @format */

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { BaseDB } from "../../../utils/Base.db";
import { PermissionsDB } from "./Permissions.db";
import { UsersDB } from "./Users.db";

@Entity()
export class RolsDB extends BaseDB {
	@Column()
	@IsString()
	@Transform((param) => String(param.value).toLowerCase())
	name: string;

	@ManyToMany(() => PermissionsDB)
	@JoinTable()
	permissions?: PermissionsDB[];

	@OneToMany(() => UsersDB, (UsersDB) => UsersDB.rol)
	@JoinColumn()
	Users: UsersDB[];
}
