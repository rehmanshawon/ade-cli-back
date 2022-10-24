/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './sys-auth.service';
import { AuthController } from './sys-auth.controller';
import { UserModule } from 'src/modules/sys-users/sys-users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
//import {ConfigService} from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
