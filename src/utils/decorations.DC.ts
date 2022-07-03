/** @format */

import { Logger } from "@nestjs/common";
import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	isString,
	isArray,
	isObject,
	isNumber,
} from "class-validator";

type types = Array<
	"object" | "number" | "string" | "function" | "promise" | "null" | "undefined" | any
>;

const logger = new Logger();

const validType = (types: types, value: any) => {
	//
	const valid = types.find((type) => {
		//
		if (type === "object") return isObject(value);

		if (type === "number") return isNumber(value);

		if (type === "string") return isString(value);

		if (value === "function" && typeof type === "function") return true;

		if (type === "promise" && value instanceof Promise) return true;

		if (type === "null" && value === null) return true;

		if (type === "undefined" && value === undefined) return true;

		if (typeof type === "function" && value instanceof type) return true;

		if (isArray(type)) return type.some((t) => validType(t, value));
	});

	return valid ? true : false;
};

export const IsTypes = (types: Array<any>, validationOptions?: ValidationOptions) => {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: "isTypes",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [types],
			options: validationOptions,
			validator: {
				validate(value: any, args: any) {
					return validType(args.constraints, value);
				},
			},
		});
	};
};

export const IsPass =
	(constraints?: any, validationOptions?: ValidationOptions) =>
	(object: Object, propertyName: string) => {
		registerDecorator({
			name: "isTypes",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [constraints],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const regex =
						/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?\.&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

					return regex.test(value);
				},
				defaultMessage() {
					return "password error format";
				},
			},
		});
	};
