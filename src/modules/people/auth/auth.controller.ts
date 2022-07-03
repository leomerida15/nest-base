/** @format */

import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { UsersLoginDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { JwtAuthGuard } from "../guards/jwt/jwt-auth.guard";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiBody({ type: UsersRegisterDTO })
	@Post("register")
	async registerUser(@Body() user: UsersRegisterDTO) {
		const { info, token } = await this.authService.registerUser(user);

		return { msg: "register ok", info, token };
	}

	@ApiBody({ type: UsersLoginDTO })
	@Post("login")
	async login(@Body() user: UsersLoginDTO) {
		const { info, token } = await this.authService.loginUser(user);

		return { msg: "login ok", info, token };
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get("all")
	async all() {
		const info = await this.authService.allUsers();

		return { msg: "all users ok", info };
	}
}
