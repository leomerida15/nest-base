/** @format */

import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entitys/Users.entity';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  const GetUsers = getRepositoryToken(UsersEntity);

  let authService: AuthService;
  let getUsers: Repository<UsersEntity>;
  let jwtService: JwtService;

  const data = {
    ok: {
      register: {
        firsName: 'test',
        lastName: 'test',
        email: 'test@test.com',
        password: 'Test123.',
        rol: 1,
      },
      login: {
        email: 'test@test.com',
        password: 'Test123.',
      },
    },
    error: {
      register: {
        firsName: 1,
        lastName: 2,
        email: 'test',
        password: 'Test123',
      },
      login: {
        email: 'test',
        password: 'Test13.',
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: GetUsers,
          useValue: {
            save: jest.fn(() => data.ok.register),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            save: jest.fn(() => data.ok.register),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    getUsers = module.get<Repository<UsersEntity>>(GetUsers);
  });

  it('defined getUsers', () => {
    expect(getUsers).toBeDefined();
  });

  it('defined authService', () => {
    expect(authService).toBeDefined();
  });

  it('defined jwtService', () => {
    expect(jwtService).toBeDefined();
  });

  describe('register', () => {
    it('valid ok cicle', async () => {
      const bcryptMock = jest
        .spyOn(bcrypt, 'hashSync')
        .mockImplementation(() => '');

      jest.spyOn(jwtService, 'sign').mockImplementation(() => '');

      delete data.ok.register.password;

      const info = data.ok.register;

      const result = { info, accesstoken: '' };

      const resp = await authService.createUser(data.ok.register);

      expect(bcryptMock).toHaveBeenCalled();

      expect(getUsers.save).toHaveBeenCalled();

      expect(jwtService.sign).toHaveBeenCalled();

      expect(resp).toEqual(result);
    });

    describe('valid err cicle', () => {
      it('valid error to save data', async () => {
        try {
          jest.spyOn(bcrypt, 'hashSync').mockImplementation(() => 'pass');

          jest.spyOn(jwtService, 'sign').mockImplementation(() => 'jwt');

          jest
            .spyOn(getUsers, 'save')
            .mockRejectedValue(new Error('error for db'));

          await authService.createUser(data.error.register as any);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('error for db');
        }
      });
    });
  });
});
