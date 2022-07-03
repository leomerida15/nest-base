/** @format */

import { HttpException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsersLoginDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { UsersDB } from "../entity/Users.db";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UsersDB)
		private getUsers: Repository<UsersDB>,
		private configService: ConfigService,
	) {}

	public createJWT(payload) {
		const { key, options } = this.configService.get("jwt");

		const token = jwt.sign(payload, key, options);
	}

	async registerUser(user: UsersRegisterDTO) {
		user.password = hashSync(user.password, 10);

		const resp = await this.getUsers.save(user);

		delete resp.password;

		return resp;
	}

	async loginUser(user: UsersLoginDTO) {
		const { email } = user;
		const userDB = await this.getUsers.findOne({ where: { email } });

		const { password, ...info } = userDB;

		const validPass = compareSync(user.password, password);

		if (!validPass) throw new HttpException("error password", 403);

		return info;
	}
}
