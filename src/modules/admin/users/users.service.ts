/** @format */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../people/entitys/Users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersAllDTO } from '../dtos/Users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly getUsers: Repository<UsersEntity>,
  ) {}

  public async allUsers({ skip, take }: UsersAllDTO = { skip: 0, take: 80 }) {
    const info = await this.getUsers.find({
      select: {
        id: true,
        lastName: true,
        firsName: true,
        phone: true,
        country: true,
        rol: true,
        email: true,
        updatedDate: true,
        createdDate: true,
      },
      order: {
        updatedDate: 'DESC',
      },
      skip,
      take,
    });

    console.log('info', info);

    return info;
  }
}
