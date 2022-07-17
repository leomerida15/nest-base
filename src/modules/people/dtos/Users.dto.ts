/** @format */

import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsISO31661Alpha2,
  IsJWT,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '../../../common/dto/Base.dto';
import { IsPass } from '../../../common/decorations';

export class UsersRegisterDTO {
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

  @IsOptional()
  @IsISO31661Alpha2()
  @ApiProperty({
    description: 'in ISO-31661 Alpha2 format',
  })
  country?: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiProperty()
  phone?: string;
}

export class UsersLoginDTO {
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

export class UsersRtDTO {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsDate()
  createdDate: Date;
}

export class UsersRefreshTokenDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsJWT()
  @ApiProperty()
  refreshtoken: string;
}
