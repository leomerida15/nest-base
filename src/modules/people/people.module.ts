/** @format */

// MVC
import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

// DB
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entitys/Users.entity';
import { RolsEntity } from './entitys/Rols.entity';
import { PermissionsEntity } from './entitys/Permissions.entity';

// config
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../common/guards/jwt/jwt.strategy';
// JWT
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/types';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, RolsEntity, PermissionsEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<JwtConfig<string>>('jwt').key,
        signOptions: configService.get<JwtConfig>('jwt').options,
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, MailService],
  controllers: [AuthController],
})
export class PeopleModule {}
