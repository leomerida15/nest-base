/** @format */

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseEntity } from '../../../utils/Base.db';
import { PermissionsEntity } from './Permissions.entity';
import { UsersEntity } from './Users.entity';

@Entity()
export class RolsEntity extends BaseEntity {
  @Column()
  @IsString()
  @Transform((param) => String(param.value).toLowerCase())
  name: string;

  @ManyToMany(() => PermissionsEntity)
  @JoinTable()
  permissions?: PermissionsEntity[];

  @OneToMany(() => UsersEntity, (UsersDB) => UsersDB.rol)
  @JoinColumn()
  Users: UsersEntity[];
}
