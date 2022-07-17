/** @format */

import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseEntity } from '../../../common/Base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { RolsEntity } from './Rols.entity';

@Entity()
export class PermissionsEntity extends BaseEntity {
  @Column()
  @IsString()
  @Transform((param) => String(param.value).toLowerCase())
  name: string;

  @ManyToMany(() => RolsEntity)
  @JoinTable()
  rols?: RolsEntity[];
}
