/** @format */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  UsersJwtDTO,
  UsersLoginDTO,
  UsersRecoverDTO,
  UsersRefreshTokenDTO,
  UsersRegisterDTO,
  UsersRtDTO,
} from '../dtos/Users.dto';
import { UsersEntity } from '../entitys/Users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private async updateRT({ id, email, createdDate }: UsersRtDTO) {
    const secret = `${email}-${createdDate}`;

    const refreshToken = this.jwtService.sign(
      { id },
      { secret, expiresIn: this.configService.get('jwt').rtExp },
    );

    await this.getUsers.update({ id }, { refreshToken: secret });

    return refreshToken;
  }

  constructor(
    @InjectRepository(UsersEntity)
    private readonly getUsers: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async createUser(user: UsersRegisterDTO) {
    user.password = bcrypt.hashSync(user.password, 10);

    const info = await this.getUsers.save(user);

    delete info.password;
    delete info.refreshToken;

    const { id, createdDate, email } = info;
    const accesstoken = this.jwtService.sign({ id });

    const refreshtoken = await this.updateRT({ id, email, createdDate });

    return { info, accesstoken, refreshtoken };
  }

  public async validUserAuth(user: UsersLoginDTO) {
    const { email } = user;

    const info = await this.getUsers.findOne({ where: { email } });
    if (!info) throw new HttpException('usern_not_found', HttpStatus.NOT_FOUND);

    const { password } = info;

    delete info.password;
    delete info.refreshToken;

    const validPass = bcrypt.compareSync(user.password, password);

    if (!validPass)
      throw new HttpException('password_invalid', HttpStatus.FORBIDDEN);

    const { id, createdDate } = info;

    const accesstoken = this.jwtService.sign({ id });
    const refreshtoken = await this.updateRT({ id, email, createdDate });

    return { info, accesstoken, refreshtoken };
  }

  public async validUserRecover(user: UsersRecoverDTO) {
    const { email } = user;

    const info = await this.getUsers.findOne({
      where: { email },
      select: { email: true, id: true },
    });
    if (!info) throw new HttpException('usern_not_found', HttpStatus.NOT_FOUND);

    const { id } = info;
    const accesstoken = this.jwtService.sign(
      { id },
      this.configService.get('mal').jwtRecover,
    );

    return { info, accesstoken };
  }

  public async recoverUsers({ email }: UsersJwtDTO) {
    const info = await this.getUsers.findOne({
      where: { email },
      select: { email: true, lastName: true },
    });

    return info;
  }

  public async refreshToken(user: UsersRefreshTokenDTO) {
    const { email, refreshtoken: token } = user;

    const {
      refreshToken: keyInDB,
      id,
      createdDate,
    } = await this.getUsers.findOne({
      where: { email },
      select: { refreshToken: true, id: true, createdDate: true },
    });

    const validToken = (() => {
      try {
        this.jwtService.verify<{ id: string }>(token, {
          secret: keyInDB,
        });
        return true;
      } catch (error) {
        return false;
      }
    })();

    if (validToken) {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const accesstoken = this.jwtService.sign({ id });
    const refreshtoken = await this.updateRT({ id, email, createdDate });

    return { refreshtoken, accesstoken };
  }
}
