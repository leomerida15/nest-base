/** @format */

import { Transform } from "class-transformer";
import { IsEmail, IsString } from "class-validator";
import { BaseDTO } from "src/utils/Base.dto";
import { IsPass } from "src/utils/decorations.DC";
import { ApiProperty } from "@nestjs/swagger";
import { hashSync } from "bcrypt";

export class UsersRegisterDTO extends BaseDTO {
	@IsEmail()
	@ApiProperty()
	email: string;

	@IsString()
	@Transform((param) => String(param.value).toLowerCase())
	@ApiProperty()
	firsName: string;

	@IsString()
	@Transform((param) => String(param.value).toLowerCase())
	@ApiProperty()
	lastName: string;

	@IsPass()
	@ApiProperty({ description: "8-15 length, A-Z, a-z, 0-9 y spechial caracter" })
	password: string;
}

export class UsersLoginDTO extends BaseDTO {
	@IsEmail()
	@ApiProperty()
	email: string;

	@IsPass()
	@ApiProperty({ description: "8-15 length, A-Z, a-z, 0-9 y spechial caracter" })
	password: string;
}

export class UsersJwtDTO extends BaseDTO {
	@IsEmail()
	@ApiProperty()
	email: string;
}
