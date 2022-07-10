/** @format */

import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	isString,
	isArray,
	isObject,
	isNumber,
} from "class-validator";

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
