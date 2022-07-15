/** @format */

import { Transform } from "class-transformer";
import {
	ArrayMaxSize,
	ArrayMinSize,
	IsArray,
	IsEmail,
	IsInstance,
	IsJWT,
	IsString,
} from "class-validator";
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
	@IsArray()
	@ArrayMinSize(1)
	@ArrayMaxSize(1)
	@IsInstance(SendSmtpEmailTo, { each: true })
	to: SendSmtpEmailTo[];

	@IsJWT()
	token: string;
}
