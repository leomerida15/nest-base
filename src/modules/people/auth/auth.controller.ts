/** @format */

import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UsersLoginDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiBody({ type: UsersRegisterDTO })
	@Post("register")
	async registerUser(@Body() user: UsersRegisterDTO) {
		const info = await this.authService.registerUser(user);

		const token = this.authService.createJWT(info);

		return { msg: "register ok", info, token };
	}

	@ApiBody({ type: UsersLoginDTO })
	@Post("login")
	async login(@Body() user: UsersLoginDTO) {
		const info = await this.authService.loginUser(user);

		const token = this.authService.createJWT(info);

		return { msg: "register ok", info, token };
	}
}
