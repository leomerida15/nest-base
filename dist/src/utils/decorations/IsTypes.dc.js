"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsTypes = void 0;
const class_validator_1 = require("class-validator");
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
//# sourceMappingURL=IsTypes.dc.js.map