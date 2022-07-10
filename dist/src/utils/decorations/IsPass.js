"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPass = void 0;
const class_validator_1 = require("class-validator");
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
//# sourceMappingURL=IsPass.js.map