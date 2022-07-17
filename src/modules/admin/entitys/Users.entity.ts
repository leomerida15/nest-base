/** @format */

import { IsEmail, IsString } from 'class-validator';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/Base.entity';
import { Transform } from 'class-transformer';
import { RolsEntity } from './Rols.entity';

@Entity()
@Index(['id', 'email'], { unique: true })
export class UsersEntity extends BaseEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Transform((param) => String(param.value).toLowerCase())
  firsName: string;

  @Column()
  @IsString()
  @Transform((param) => String(param.value).toLowerCase())
  lastName: string;

  @Column()
  password: string;

  @ManyToOne(() => RolsEntity, (RolsEntity) => RolsEntity.Users)
  rol: RolsEntity | number;
}
