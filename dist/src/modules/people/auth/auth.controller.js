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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const resp_dto_1 = require("../../../utils/resp.dto");
const Users_dto_1 = require("../dtos/Users.dto");
const mail_service_1 = require("../mail/mail.service");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService, mailService) {
        this.authService = authService;
        this.mailService = mailService;
    }
    async registerUser(user) {
        const { info, accesstoken } = await this.authService.createUser(user);
        const { email, firsName, lastName } = info;
        await this.mailService.addUser({ email, firsName, lastName });
        return { msg: "register ok", info, accesstoken };
    }
    async loginUser(user) {
        const { info, accesstoken } = await this.authService.validUserAuth(user);
        return { msg: "login ok", info, accesstoken };
    }
    async recoverUser(user) {
        const { info, accesstoken } = await this.authService.validUserRecover(user);
        const { email, firsName, lastName } = info;
        await this.mailService.sendRecover({
            to: [{ email, name: `${firsName} ${lastName}` }],
            token: accesstoken,
        });
        return { msg: "email recover ok" };
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: Users_dto_1.UsersRegisterDTO }),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.CREATED, schema: { $ref: (0, swagger_1.getSchemaPath)(resp_dto_1.RespDTO) } }),
    (0, common_1.Post)("register"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Users_dto_1.UsersRegisterDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: Users_dto_1.UsersLoginDTO }),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.CREATED, schema: { $ref: (0, swagger_1.getSchemaPath)(resp_dto_1.RespDTO) } }),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Users_dto_1.UsersLoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: Users_dto_1.UsersRecoverDTO }),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.CREATED, schema: { $ref: (0, swagger_1.getSchemaPath)(resp_dto_1.RespDTO) } }),
    (0, common_1.Get)("recover"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Users_dto_1.UsersRecoverDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "recoverUser", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        mail_service_1.MailService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map