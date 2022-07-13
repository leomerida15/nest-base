/** @format */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsersJwtDTO, UsersLoginDTO, UsersRecoverDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { UsersDB } from "../entity/Users.db";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UsersDB)
		private readonly getUsers: Repository<UsersDB>,
		private readonly jwtService: JwtService,
	) {}

	public async createUser(user: UsersRegisterDTO) {
		user.password = bcrypt.hashSync(user.password, 10);

		const info = await this.getUsers.save(user);

		delete info.password;

		const { id } = info;
		const accesstoken = this.jwtService.sign({ id });

		return { info, accesstoken };
	}

	public async validUserAuth(user: UsersLoginDTO) {
		const { email } = user;

		const userDB = await this.getUsers.findOne({ where: { email } });
		if (!userDB) throw new HttpException("usern_not_found", HttpStatus.NOT_FOUND);

		const { password, ...info } = userDB;

		const validPass = bcrypt.compareSync(user.password, password);

		if (!validPass) throw new HttpException("password_invalid", HttpStatus.FORBIDDEN);

		const { id } = info;
		const accesstoken = this.jwtService.sign({ id });

		return { info, accesstoken };
	}

	public async validUserRecover(user: UsersRecoverDTO) {
		const { email } = user;

		const userDB = await this.getUsers.findOne({
			where: { email },
			select: { email: true, id: true },
		});
		if (!userDB) throw new HttpException("usern_not_found", HttpStatus.NOT_FOUND);

		const { id } = userDB;
		const accesstoken = this.jwtService.sign({ id }, {
			
		});

		return { info, accesstoken };
	}

	public async allUsers() {
		const info = await this.getUsers.find();

		return info;
	}

	public async recoverUsers({ email }: UsersJwtDTO) {
		const info = await this.getUsers.findOne({
			where: { email },
			select: { email: true, lastName: true },
		});

		return info;
	}
}
