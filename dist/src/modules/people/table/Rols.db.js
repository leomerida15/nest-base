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
exports.RolsDB = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Base_db_1 = require("../../../utils/Base.db");
const Permissions_db_1 = require("./Permissions.db");
const Users_db_1 = require("./Users.db");
let RolsDB = class RolsDB extends Base_db_1.BaseDB {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)((param) => String(param.value).toLowerCase()),
    __metadata("design:type", String)
], RolsDB.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Permissions_db_1.PermissionsDB),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], RolsDB.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Users_db_1.UsersDB, (UsersDB) => UsersDB.rol),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], RolsDB.prototype, "Users", void 0);
RolsDB = __decorate([
    (0, typeorm_1.Entity)()
], RolsDB);
exports.RolsDB = RolsDB;
//# sourceMappingURL=Rols.db.js.map