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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const Users_db_1 = require("../entity/Users.db");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(getUsers, configService) {
        this.getUsers = getUsers;
        this.configService = configService;
    }
    createJWT(payload) {
        const { key, options } = this.configService.get("jwt");
        const token = jsonwebtoken_1.default.sign(payload, key, options);
    }
    async registerUser(user) {
        user.password = (0, bcrypt_1.hashSync)(user.password, 10);
        const resp = await this.getUsers.save(user);
        delete resp.password;
        return resp;
    }
    async loginUser(user) {
        const { email } = user;
        const userDB = await this.getUsers.findOne({ where: { email } });
        const { password } = userDB, info = __rest(userDB, ["password"]);
        const validPass = (0, bcrypt_1.compareSync)(user.password, password);
        if (!validPass)
            throw new common_1.HttpException("error password", 403);
        return info;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(Users_db_1.UsersDB)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map