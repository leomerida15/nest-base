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
exports.UsersDB = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Base_db_1 = require("../../../utils/Base.db");
const class_transformer_1 = require("class-transformer");
const Rols_db_1 = require("./Rols.db");
const Courses_db_1 = require("../../courses/entity/Courses.db");
let UsersDB = class UsersDB extends Base_db_1.BaseDB {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UsersDB.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)((param) => String(param.value).toLowerCase()),
    __metadata("design:type", String)
], UsersDB.prototype, "firsName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)((param) => String(param.value).toLowerCase()),
    __metadata("design:type", String)
], UsersDB.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersDB.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Rols_db_1.RolsDB, (RolsDB) => RolsDB.Users),
    __metadata("design:type", Object)
], UsersDB.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Courses_db_1.CoursesDB),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], UsersDB.prototype, "courses", void 0);
UsersDB = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(["id", "email"], { unique: true })
], UsersDB);
exports.UsersDB = UsersDB;
//# sourceMappingURL=Users.db.js.map