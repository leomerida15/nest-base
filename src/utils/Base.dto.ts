/** @format */

import { IsDate, IsOptional, IsUUID } from "class-validator";

export class BaseDTO {
	@IsOptional()
	@IsUUID()
	id?: string;

	@IsOptional()
	@IsDate()
	createdDate?: Date;

	@IsOptional()
	@IsDate()
	updatedDate?: Date;
}
