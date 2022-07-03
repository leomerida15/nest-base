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
exports.CoursesDB = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Users_db_1 = require("../../people/entity/Users.db");
const Base_db_1 = require("../../../utils/Base.db");
const typeorm_1 = require("typeorm");
let CoursesDB = class CoursesDB extends Base_db_1.BaseDB {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)((param) => String(param.value).toLowerCase()),
    __metadata("design:type", String)
], CoursesDB.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Users_db_1.UsersDB),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], CoursesDB.prototype, "studens", void 0);
CoursesDB = __decorate([
    (0, typeorm_1.Entity)()
], CoursesDB);
exports.CoursesDB = CoursesDB;
//# sourceMappingURL=Courses.db.js.map