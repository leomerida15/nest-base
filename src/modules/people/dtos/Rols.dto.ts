import { Transform } from 'class-transformer';
import { IsArray, IsInstance, IsOptional, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/dto/Base.dto';
import { PermissionsEntity } from '../entitys/Permissions.entity';
import { UsersEntity } from '../entitys/Users.entity';

export class RolsDTO extends BaseDTO {
  @IsString()
  @Transform((param) => String(param.value).toLowerCase())
  name: string;

  @IsOptional()
  @IsArray()
  @IsInstance(PermissionsEntity, { each: true })
  permissions?: PermissionsEntity[];

  @IsOptional()
  @IsArray()
  @IsInstance(RolsDTO, { each: true })
  Users: UsersEntity[];
}
