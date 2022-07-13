/** @format */

// MVC
import { Module } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";

// DB
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersDB } from "./entitys/Users.db";
import { RolsDB } from "./entitys/Rols.db";
import { PermissionsDB } from "./entitys/Permissions.db";

// config
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./guards/jwt/jwt.strategy";
// JWT
import { JwtModule } from "@nestjs/jwt";
import { JwtConfig } from "src/config/types";
import { MailService } from "./mail/mail.service";

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
	providers: [AuthService, JwtStrategy, MailService],
	controllers: [AuthController],
})
export class PeopleModule {}
