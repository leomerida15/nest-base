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

export const IsMulty =
	(constraints?: any, validationOptions?: ValidationOptions) =>
	(object: Object, propertyName: string) => {
		registerDecorator({
			name: "IsMultyIs",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [constraints],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const valid = args.constraints.find((valid) => valid(value));

					return valid ? true : false;
				},
				defaultMessage() {
					return "password error format";
				},
			},
		});
	};
