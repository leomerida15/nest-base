/** @format */

import { Transform } from 'class-transformer';
import { IsArray, IsInstance, IsOptional, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/dto/Base.dto';
import { RolsEntity } from '../entitys/Rols.entity';

export class PermissionsDTO extends BaseDTO {
  @IsString()
  @Transform((param) => String(param.value).toLowerCase())
  name: string;

  @IsOptional()
  @IsArray()
  @IsInstance(RolsEntity, {
    each: true,
  })
  rols?: RolsEntity[];
}
