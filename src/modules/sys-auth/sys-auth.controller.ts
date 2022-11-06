/* eslint-disable prettier/prettier */
import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './sys-auth.service';
import { CreateSysUsersDto } from 'src/modules/sys_users/dto/create-sys_users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body() user: CreateSysUsersDto) {
    // console.log(user);
    return await this.authService.create(user);
  }
}
