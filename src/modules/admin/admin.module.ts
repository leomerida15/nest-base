/** @format */

// MVC
import { Module } from '@nestjs/common';

// DB
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entitys/Users.entity';
import { RolsEntity } from './entitys/Rols.entity';
import { PermissionsEntity } from './entitys/Permissions.entity';

// config

// JWT
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, RolsEntity, PermissionsEntity]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class AdminModule {}
