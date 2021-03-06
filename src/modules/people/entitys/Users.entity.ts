/** @format */

import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsOptional,
  IsISO31661Alpha2,
  IsJWT,
} from 'class-validator';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/Base.entity';
import { Transform } from 'class-transformer';
import { RolsEntity } from './Rols.entity';
import { IsPass } from '../../../common/decorations';

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
  @Transform((param) => String(param.value).toLowerCase().replace(/' '/g, ''))
  lastName: string;

  @Column()
  @IsPass()
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsISO31661Alpha2()
  country?: string;

  @Column({ nullable: true })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @Column({ nullable: true })
  @IsJWT()
  @IsOptional()
  refreshToken?: string;

  @ManyToOne(() => RolsEntity, (RolsEntity) => RolsEntity.Users)
  rol: RolsEntity | number;
}
