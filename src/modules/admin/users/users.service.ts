/** @format */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../people/entitys/Users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly getUsers: Repository<UsersEntity>,
  ) {}

  public async allUsers() {
    const info = await this.getUsers.find();

    return info;
  }
}
