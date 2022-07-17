/** @format */

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { RespDTO } from '../../../common/resp.dto';
import {
  UsersLoginDTO,
  UsersRecoverDTO,
  UsersRefreshTokenDTO,
  UsersRegisterDTO,
} from '../dtos/Users.dto';
import { MailService } from '../mail/mail.service';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @ApiBody({ type: UsersRegisterDTO })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    schema: { $ref: getSchemaPath(RespDTO) },
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() user: UsersRegisterDTO) {
    const { info, accesstoken, refreshtoken } =
      await this.authService.createUser(user);

    const { email, firsName, lastName } = info;

    await this.mailService.addUser({ email, firsName, lastName });

    return { msg: 'register ok', info, accesstoken, refreshtoken };
  }

  @ApiBody({ type: UsersLoginDTO })
  @ApiOkResponse({
    status: HttpStatus.ACCEPTED,
    schema: { $ref: getSchemaPath(RespDTO) },
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  async loginUser(@Body() user: UsersLoginDTO) {
    const { info, accesstoken, refreshtoken } =
      await this.authService.validUserAuth(user);

    return { msg: 'login ok', info, accesstoken, refreshtoken };
  }

  @ApiBearerAuth()
  @ApiBody({ type: UsersRecoverDTO })
  @ApiOkResponse({
    status: HttpStatus.RESET_CONTENT,
    schema: { $ref: getSchemaPath(RespDTO) },
  })
  @HttpCode(HttpStatus.RESET_CONTENT)
  @Get('recover')
  async recoverUser(user: UsersRecoverDTO) {
    const { info, accesstoken } = await this.authService.validUserRecover(user);

    const { email, firsName, lastName } = info;

    await this.mailService.sendRecover({
      to: [{ email, name: `${firsName} ${lastName}` }],
      token: accesstoken,
    });

    return { msg: 'email recover ok' };
  }

  @ApiBearerAuth()
  @ApiBody({ type: UsersRefreshTokenDTO })
  @ApiOkResponse({
    status: HttpStatus.RESET_CONTENT,
    schema: { $ref: getSchemaPath(RespDTO) },
  })
  @HttpCode(HttpStatus.RESET_CONTENT)
  @Put('rt')
  async rtUser(@Body() user: UsersRefreshTokenDTO) {
    const { refreshtoken, accesstoken } = await this.authService.refreshToken(
      user,
    );

    return { msg: 'rt ok', refreshtoken, accesstoken };
  }
}
