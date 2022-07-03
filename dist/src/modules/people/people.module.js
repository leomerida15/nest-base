"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth/auth.service");
const auth_controller_1 = require("./auth/auth.controller");
const typeorm_1 = require("@nestjs/typeorm");
const Users_db_1 = require("./entity/Users.db");
const Rols_db_1 = require("./entity/Rols.db");
const Permissions_db_1 = require("./entity/Permissions.db");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./guards/jwt/jwt.strategy");
const jwt_1 = require("@nestjs/jwt");
let PeopleModule = class PeopleModule {
};
PeopleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Users_db_1.UsersDB, Rols_db_1.RolsDB, Permissions_db_1.PermissionsDB]),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get("jwt").key,
                    signOptions: configService.get("jwt").options,
                }),
            }),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController],
    })
], PeopleModule);
exports.PeopleModule = PeopleModule;
//# sourceMappingURL=people.module.js.map