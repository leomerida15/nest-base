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
exports.UsersJwtDTO = exports.UsersLoginDTO = exports.UsersRegisterDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Base_dto_1 = require("../../../utils/Base.dto");
const decorations_DC_1 = require("../../../utils/decorations.DC");
const swagger_1 = require("@nestjs/swagger");
class UsersRegisterDTO extends Base_dto_1.BaseDTO {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UsersRegisterDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)((param) => String(param.value).toLowerCase()),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UsersRegisterDTO.prototype, "firsName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)((param) => String(param.value).toLowerCase()),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UsersRegisterDTO.prototype, "lastName", void 0);
__decorate([
    (0, decorations_DC_1.IsPass)(),
    (0, swagger_1.ApiProperty)({ description: "8-15 length, A-Z, a-z, 0-9 y spechial caracter" }),
    __metadata("design:type", String)
], UsersRegisterDTO.prototype, "password", void 0);
exports.UsersRegisterDTO = UsersRegisterDTO;
class UsersLoginDTO extends Base_dto_1.BaseDTO {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UsersLoginDTO.prototype, "email", void 0);
__decorate([
    (0, decorations_DC_1.IsPass)(),
    (0, swagger_1.ApiProperty)({ description: "8-15 length, A-Z, a-z, 0-9 y spechial caracter" }),
    __metadata("design:type", String)
], UsersLoginDTO.prototype, "password", void 0);
exports.UsersLoginDTO = UsersLoginDTO;
class UsersJwtDTO extends Base_dto_1.BaseDTO {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UsersJwtDTO.prototype, "email", void 0);
exports.UsersJwtDTO = UsersJwtDTO;
//# sourceMappingURL=Users.dto.js.map