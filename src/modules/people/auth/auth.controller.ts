/** @format */

import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { RespDTO } from "../../../utils/resp.dto";
import { UsersLoginDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { JwtAuthGuard } from "../guards/jwt/jwt-auth.guard";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiBody({ type: UsersRegisterDTO })
	@ApiOkResponse({ status: HttpStatus.CREATED, schema: { $ref: getSchemaPath(RespDTO) } })
	@Post("register")
	@HttpCode(HttpStatus.CREATED)
	async registerUser(@Body() user: UsersRegisterDTO) {
		const { info, accesstoken } = await this.authService.createUser(user);

		return { msg: "register ok", info, accesstoken };
	}

	@ApiBody({ type: UsersLoginDTO })
	@Post("login")
	async loginUser(@Body() user: UsersLoginDTO) {
		const { info, accesstoken } = await this.authService.validUser(user);

		return { msg: "login ok", info, accesstoken };
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get("all")
	async allUser() {
		const info = await this.authService.allUsers();

		return { msg: "all users ok", info };
	}
}
