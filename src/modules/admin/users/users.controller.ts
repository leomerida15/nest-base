/** @format */

import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { RespDTO } from '../../../common/resp.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt/jwt-auth.guard';
import { UsersService } from './users.service';

@ApiTags('auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    schema: { $ref: getSchemaPath(RespDTO) },
  })
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async allUser() {
    const info = await this.usersService.allUsers();

    return { msg: 'all users ok', info };
  }
}
