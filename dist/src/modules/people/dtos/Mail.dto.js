"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRecoverProps = exports.AddUserProps = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const sib_api_v3_typescript_1 = require("sib-api-v3-typescript");
const processTo = (to) => {
    if (Array.isArray(to))
        return to;
    return [to];
};
class AddUserProps {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AddUserProps.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).toLowerCase()),
    __metadata("design:type", String)
], AddUserProps.prototype, "firsName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).toLowerCase()),
    __metadata("design:type", String)
], AddUserProps.prototype, "lastName", void 0);
exports.AddUserProps = AddUserProps;
class sendRecoverProps {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(1),
    (0, class_validator_1.IsInstance)(sib_api_v3_typescript_1.SendSmtpEmailTo, { each: true }),
    __metadata("design:type", Array)
], sendRecoverProps.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsJWT)(),
    __metadata("design:type", String)
], sendRecoverProps.prototype, "token", void 0);
exports.sendRecoverProps = sendRecoverProps;
//# sourceMappingURL=Mail.dto.js.map