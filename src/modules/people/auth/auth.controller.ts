/** @format */

import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { RespDTO } from "../../../utils/resp.dto";
import { UsersLoginDTO, UsersRecoverDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { JwtAuthGuard } from "../guards/jwt/jwt-auth.guard";
import { MailService } from "../mail/mail.service";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly mailService: MailService,
	) {}

	@ApiBody({ type: UsersRegisterDTO })
	@ApiOkResponse({ status: HttpStatus.CREATED, schema: { $ref: getSchemaPath(RespDTO) } })
	@Post("register")
	@HttpCode(HttpStatus.CREATED)
	async registerUser(@Body() user: UsersRegisterDTO) {
		const { info, accesstoken } = await this.authService.createUser(user);

		const { email, firsName, lastName } = info;

		await this.mailService.addUser({ email, firsName, lastName });

		return { msg: "register ok", info, accesstoken };
	}

	@ApiBody({ type: UsersLoginDTO })
	@Post("login")
	async loginUser(@Body() user: UsersLoginDTO) {
		const { info, accesstoken } = await this.authService.validUserAuth(user);

		return { msg: "login ok", info, accesstoken };
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get("all")
	async allUser() {
		const info = await this.authService.allUsers();

		return { msg: "all users ok", info };
	}

	@ApiBearerAuth()
	@Get("all")
	async recoverUser(user: UsersRecoverDTO) {
		const { info, accesstoken } = await this.authService.validUserRecover(user);

		const { email, firsName, lastName } = info;

		await this.mailService.sendRecover({ to: { email, name: `${firsName} ${lastName}` } });

		return { msg: "all users ok", info };
	}
}
