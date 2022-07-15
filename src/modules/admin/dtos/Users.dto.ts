/** @format */

import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '../../../utils/dto/Base.dto';
import { IsPass } from '../../../utils/decorations';

export class UsersRegisterDTO extends BaseDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Transform((param) => String(param.value).toLowerCase())
  @ApiProperty()
  firsName: string;

  @IsString()
  @Transform((param) => String(param.value).toLowerCase())
  @ApiProperty()
  lastName: string;

  @IsPass()
  @ApiProperty({
    description: '8-15 length, A-Z, a-z, 0-9 y spechial caracter',
  })
  password: string;
}

export class UsersLoginDTO extends BaseDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsPass()
  @ApiProperty({
    description: '8-15 length, A-Z, a-z, 0-9 y spechial caracter',
  })
  password: string;
}

export class UsersJwtDTO extends BaseDTO {
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class UsersRecoverDTO {
  @IsEmail()
  @ApiProperty()
  email: string;
}
