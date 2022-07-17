/** @format */

import { IsDate, IsUUID } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id?: string;

  @CreateDateColumn({ select: false })
  @IsDate()
  createdDate?: Date;

  @UpdateDateColumn({ select: false })
  @IsDate()
  updatedDate?: Date;
}
