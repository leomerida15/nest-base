/** @format */

// MVC
import { Module } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";

// DB
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersDB } from "./entity/Users.db";
import { RolsDB } from "./entity/Rols.db";
import { PermissionsDB } from "./entity/Permissions.db";

// config
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./guards/jwt/jwt.strategy";
// JWT
import { JwtModule } from "@nestjs/jwt";
import { JwtConfig } from "src/config/types";

@Module({
	imports: [
		TypeOrmModule.forFeature([UsersDB, RolsDB, PermissionsDB]),
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<JwtConfig<string>>("jwt").key,
				signOptions: configService.get<JwtConfig>("jwt").options,
			}),
		}),
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
})
export class PeopleModule {}
