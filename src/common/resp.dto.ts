/** @format */

import {
  isArray,
  IsJWT,
  isObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsMulty } from './decorations';

export class RespDTO {
  @IsString()
  msg: string;

  @IsOptional()
  @IsMulty([isObject, isArray])
  info?: any;

  @IsOptional()
  @IsString()
  @IsJWT()
  accesstoken?: string;

  @IsOptional()
  @IsString()
  @IsJWT()
  refreshtoken?: string;
}
