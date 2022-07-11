/** @format */

import { Transform } from "class-transformer";
import { IsEmail, IsString } from "class-validator";
import { SendSmtpEmailTo } from "sib-api-v3-typescript";

const processTo = (to: SendSmtpEmailTo | SendSmtpEmailTo[]): SendSmtpEmailTo[] => {
	if (Array.isArray(to)) return to;
	return [to];
};

export class AddUserProps {
	@IsEmail()
	email: string;

	@IsString()
	@Transform(({ value }) => String(value).toLowerCase())
	firsName: string;

	@IsString()
	@Transform(({ value }) => String(value).toLowerCase())
	lastName: string;
}

export class sendRecoverProps {
	@Transform(({ value }) => processTo(value))
	to: SendSmtpEmailTo[];
}
