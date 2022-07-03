/** @format */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsersLoginDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { UsersDB } from "../entity/Users.db";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync, hashSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UsersDB)
		private getUsers: Repository<UsersDB>,
		private readonly jwtService: JwtService,
	) {}

	public async registerUser(user: UsersRegisterDTO) {
		user.password = hashSync(user.password, 10);

		const info = await this.getUsers.save(user);

		delete info.password;

		const { id } = info;
		const token = this.jwtService.sign({ id });

		return { info, token };
	}

	public async loginUser(user: UsersLoginDTO) {
		const { email } = user;
		const userDB = await this.getUsers.findOne({ where: { email } });
		if (!userDB) throw new HttpException("usern_not_found", HttpStatus.NOT_FOUND);

		const { password, ...info } = userDB;

		const validPass = compareSync(user.password, password);

		if (!validPass) throw new HttpException("password_invalid", HttpStatus.FORBIDDEN);

		const { id } = info;
		const token = this.jwtService.sign({ id });

		return { info, token };
	}

	public async allUsers() {
		const info = await this.getUsers.find();

		return info;
	}
}
