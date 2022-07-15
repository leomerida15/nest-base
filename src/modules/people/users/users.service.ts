/** @format */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsersJwtDTO, UsersLoginDTO, UsersRecoverDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { UsersDB } from "../entitys/Users.db";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UsersDB)
		private readonly getUsers: Repository<UsersDB>,
	) {}

	public async allUsers() {
		const info = await this.getUsers.find();

		return info;
	}
}