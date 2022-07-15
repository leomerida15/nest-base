/** @format */

import {
  IsAlpha,
  IsDate,
  IsEmail,
  IsAlphanumeric,
  IsString,
} from 'class-validator';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../utils/Base.db';
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
