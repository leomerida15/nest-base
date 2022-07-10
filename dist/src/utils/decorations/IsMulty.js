"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMulty = void 0;
const class_validator_1 = require("class-validator");
const IsMulty = (constraints, validationOptions) => (object, propertyName) => {
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
exports.IsMulty = IsMulty;
//# sourceMappingURL=IsMulty.js.map