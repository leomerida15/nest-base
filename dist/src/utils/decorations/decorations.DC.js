"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMultyIs = exports.IsPass = exports.IsTypes = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const logger = new common_1.Logger();
const validType = (types, value) => {
    const valid = types.find((type) => {
        if (type === "object")
            return (0, class_validator_1.isObject)(value);
        if (type === "number")
            return (0, class_validator_1.isNumber)(value);
        if (type === "string")
            return (0, class_validator_1.isString)(value);
        if (value === "function" && typeof type === "function")
            return true;
        if (type === "promise" && value instanceof Promise)
            return true;
        if (type === "null" && value === null)
            return true;
        if (type === "undefined" && value === undefined)
            return true;
        if (typeof type === "function" && value instanceof type)
            return true;
        if ((0, class_validator_1.isArray)(type))
            return type.some((t) => validType(t, value));
    });
    return valid ? true : false;
};
const IsTypes = (types, validationOptions) => {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isTypes",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [types],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return validType(args.constraints, value);
                },
            },
        });
    };
};
exports.IsTypes = IsTypes;
const IsPass = (constraints, validationOptions) => (object, propertyName) => {
    (0, class_validator_1.registerDecorator)({
        name: "isTypes",
        target: object.constructor,
        propertyName: propertyName,
        constraints: [constraints],
        options: validationOptions,
        validator: {
            validate(value, args) {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?\.&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
                return regex.test(value);
            },
            defaultMessage() {
                return "password error format";
            },
        },
    });
};
exports.IsPass = IsPass;
const IsMultyIs = (constraints, validationOptions) => (object, propertyName) => {
    (0, class_validator_1.registerDecorator)({
        name: "IsMultyIs",
        target: object.constructor,
        propertyName: propertyName,
        constraints: [constraints],
        options: validationOptions,
        validator: {
            validate(value, args) {
                const valid = args.constraints.find((valid) => valid(value));
                return valid ? true : false;
            },
            defaultMessage() {
                return "password error format";
            },
        },
    });
};
exports.IsMultyIs = IsMultyIs;
//# sourceMappingURL=decorations.DC.js.map