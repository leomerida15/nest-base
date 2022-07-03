/** @format */

import { IsDate, IsUUID } from "class-validator";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseDB {
	@PrimaryGeneratedColumn("uuid")
	@IsUUID()
	id?: string;

	@CreateDateColumn()
	@IsDate()
	createdDate?: Date;

	@UpdateDateColumn()
	@IsDate()
	updatedDate?: Date;
}
