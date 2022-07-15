/** @format */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../people/entitys/Users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  const GetUsers = getRepositoryToken(UsersEntity);
  let getUsers: Repository<UsersEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: GetUsers,
          useValue: {
            find: jest.fn(() => []),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    getUsers = module.get<Repository<UsersEntity>>(GetUsers);
  });

  it('defined getUsers', () => {
    expect(getUsers).toBeDefined();
  });

  it('defined usersService', () => {
    expect(usersService).toBeDefined();
  });

  describe('valis all user', () => {
    it('allUsers ok', async () => {
      const result = await usersService.allUsers();

      expect(Array.isArray(result)).toBe(true);
      expect(getUsers.find).toHaveBeenCalled();
    });
  });
});
