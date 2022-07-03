/** @format */

import { Module } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersDB } from "./entity/Users.db";
import { RolsDB } from "./entity/Rols.db";
import { PermissionsDB } from "./entity/Permissions.db";

@Module({
	imports: [TypeOrmModule.forFeature([UsersDB, RolsDB, PermissionsDB])],
	providers: [AuthService],
	controllers: [AuthController],
})
export class PeopleModule {}
